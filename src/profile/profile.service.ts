import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { User, UserDocument, UserType } from './schemas/user.schema';
import { CreateProfileDto, UpdateProfileDto, LawyerOnboardingDto } from './dto';

export interface PaginationOptions {
    page?: number;
    limit?: number;
}

export interface LawyerFilterOptions extends PaginationOptions {
    city?: string;
    specialization?: string;
    minExperience?: number;
}

@Injectable()
export class ProfileService {
    private readonly logger = new Logger(ProfileService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    /**
     * Create a new profile
     */
    async create(createProfileDto: CreateProfileDto): Promise<UserDocument> {
        try {
            const newUser = new this.userModel(createProfileDto);
            const savedUser = await newUser.save();
            this.logger.log(`Profile created with ID: ${savedUser._id}`);
            return savedUser;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Email or phone number already exists');
            }
            throw error;
        }
    }

    /**
     * Find all profiles with pagination
     */
    async findAll(options: PaginationOptions = {}): Promise<{
        data: UserDocument[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.userModel.find().skip(skip).limit(limit).exec(),
            this.userModel.countDocuments(),
        ]);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    /**
     * Find profile by ID
     */
    async findOne(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }
        return user;
    }

    /**
     * Find profile by email
     */
    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    /**
     * Find profile by phone number
     */
    async findByPhone(phoneNumber: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ phoneNumber }).exec();
    }

    /**
     * Update profile
     */
    async update(id: string, updateProfileDto: UpdateProfileDto): Promise<UserDocument> {
        try {
            const updatedUser = await this.userModel
                .findByIdAndUpdate(id, updateProfileDto, { new: true })
                .exec();

            if (!updatedUser) {
                throw new NotFoundException(`Profile with ID ${id} not found`);
            }

            this.logger.log(`Profile updated: ${id}`);
            return updatedUser;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Email or phone number already exists');
            }
            throw error;
        }
    }

    /**
     * Delete profile
     */
    async remove(id: string): Promise<{ message: string }> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }
        this.logger.log(`Profile deleted: ${id}`);
        return { message: 'Profile deleted successfully' };
    }

    /**
     * Complete lawyer onboarding
     */
    async completeLawyerOnboarding(
        id: string,
        onboardingDto: LawyerOnboardingDto,
    ): Promise<UserDocument> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }

        const updatedUser = await this.userModel
            .findByIdAndUpdate(
                id,
                {
                    ...onboardingDto,
                    userType: UserType.LAWYER,
                    isOnboardingComplete: true,
                },
                { new: true },
            )
            .exec();

        if (!updatedUser) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }

        this.logger.log(`Lawyer onboarding completed for: ${id}`);
        return updatedUser;
    }

    /**
     * Find all lawyers with optional filters
     */
    async findLawyers(options: LawyerFilterOptions = {}): Promise<{
        data: UserDocument[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        const { page = 1, limit = 10, city, specialization, minExperience } = options;
        const skip = (page - 1) * limit;

        const filter: FilterQuery<UserDocument> = {
            userType: UserType.LAWYER,
            isActive: true,
        };

        if (city) {
            filter.city = { $regex: city, $options: 'i' };
        }

        if (specialization) {
            filter.specializations = { $in: [new RegExp(specialization, 'i')] };
        }

        if (minExperience !== undefined) {
            filter.yearsOfExperience = { $gte: minExperience };
        }

        const [data, total] = await Promise.all([
            this.userModel.find(filter).skip(skip).limit(limit).exec(),
            this.userModel.countDocuments(filter),
        ]);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    /**
     * Update online status
     */
    async updateOnlineStatus(id: string, isOnline: boolean): Promise<UserDocument> {
        const updateData: Partial<User> = { isOnline };
        if (!isOnline) {
            updateData.lastSeen = new Date();
        }

        const user = await this.userModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();

        if (!user) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }

        return user;
    }

    /**
     * Update FCM token
     */
    async updateFcmToken(id: string, fcmToken: string): Promise<UserDocument> {
        const user = await this.userModel
            .findByIdAndUpdate(id, { fcmToken }, { new: true })
            .exec();

        if (!user) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }

        return user;
    }
}
