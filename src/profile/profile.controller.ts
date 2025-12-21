import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto, LawyerOnboardingDto } from './dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new profile' })
    @ApiResponse({ status: 201, description: 'Profile created successfully' })
    @ApiResponse({ status: 409, description: 'Email or phone already exists' })
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profileService.create(createProfileDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all profiles with pagination' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
    @ApiResponse({ status: 200, description: 'List of profiles' })
    findAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.profileService.findAll({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });
    }

    @Get('lawyers')
    @ApiOperation({ summary: 'Get all lawyers with optional filters' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
    @ApiQuery({ name: 'city', required: false, type: String, description: 'Filter by city' })
    @ApiQuery({ name: 'specialization', required: false, type: String, description: 'Filter by specialization' })
    @ApiQuery({ name: 'minExperience', required: false, type: Number, description: 'Minimum years of experience' })
    @ApiResponse({ status: 200, description: 'List of lawyers' })
    findLawyers(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('city') city?: string,
        @Query('specialization') specialization?: string,
        @Query('minExperience') minExperience?: number,
    ) {
        return this.profileService.findLawyers({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            city,
            specialization,
            minExperience: minExperience ? Number(minExperience) : undefined,
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a profile by ID' })
    @ApiParam({ name: 'id', description: 'Profile ID' })
    @ApiResponse({ status: 200, description: 'Profile found' })
    @ApiResponse({ status: 404, description: 'Profile not found' })
    findOne(@Param('id') id: string) {
        return this.profileService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a profile' })
    @ApiParam({ name: 'id', description: 'Profile ID' })
    @ApiResponse({ status: 200, description: 'Profile updated successfully' })
    @ApiResponse({ status: 404, description: 'Profile not found' })
    @ApiResponse({ status: 409, description: 'Email or phone already exists' })
    update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.profileService.update(id, updateProfileDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a profile' })
    @ApiParam({ name: 'id', description: 'Profile ID' })
    @ApiResponse({ status: 200, description: 'Profile deleted successfully' })
    @ApiResponse({ status: 404, description: 'Profile not found' })
    remove(@Param('id') id: string) {
        return this.profileService.remove(id);
    }

    @Post(':id/onboarding/lawyer')
    @ApiOperation({ summary: 'Complete lawyer onboarding for a profile' })
    @ApiParam({ name: 'id', description: 'Profile ID' })
    @ApiResponse({ status: 200, description: 'Lawyer onboarding completed successfully' })
    @ApiResponse({ status: 404, description: 'Profile not found' })
    completeLawyerOnboarding(
        @Param('id') id: string,
        @Body() onboardingDto: LawyerOnboardingDto,
    ) {
        return this.profileService.completeLawyerOnboarding(id, onboardingDto);
    }

    @Patch(':id/online-status')
    @ApiOperation({ summary: 'Update online status' })
    @ApiParam({ name: 'id', description: 'Profile ID' })
    @ApiQuery({ name: 'isOnline', required: true, type: Boolean, description: 'Online status' })
    @ApiResponse({ status: 200, description: 'Online status updated' })
    @ApiResponse({ status: 404, description: 'Profile not found' })
    updateOnlineStatus(
        @Param('id') id: string,
        @Query('isOnline') isOnline: string,
    ) {
        return this.profileService.updateOnlineStatus(id, isOnline === 'true');
    }

    @Patch(':id/fcm-token')
    @ApiOperation({ summary: 'Update FCM token' })
    @ApiParam({ name: 'id', description: 'Profile ID' })
    @ApiResponse({ status: 200, description: 'FCM token updated' })
    @ApiResponse({ status: 404, description: 'Profile not found' })
    updateFcmToken(
        @Param('id') id: string,
        @Body('fcmToken') fcmToken: string,
    ) {
        return this.profileService.updateFcmToken(id, fcmToken);
    }
}
