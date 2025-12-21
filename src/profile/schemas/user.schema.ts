import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

export enum LoginType {
    EMAIL = 'email',
    GOOGLE = 'google',
    APPLE = 'apple',
    PHONE = 'phone',
}

export enum UserType {
    USER = 'user',
    LAWYER = 'lawyer',
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
    PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
    CONNECTIONS_ONLY = 'connections_only',
}

@Schema({ timestamps: true })
export class User {
    @ApiProperty({ description: 'User email address' })
    @Prop({ type: String, unique: true, sparse: true })
    email?: string;

    @ApiProperty({ description: 'Login type', enum: LoginType })
    @Prop({ type: String, enum: LoginType, default: LoginType.PHONE })
    loginType?: LoginType;

    @ApiProperty({ description: 'Profile picture URL' })
    @Prop({ type: String })
    profilePic?: string;

    @ApiProperty({ description: 'Firebase Cloud Messaging token' })
    @Prop({ type: String })
    fcmToken?: string;

    @ApiProperty({ description: 'Country code for phone number' })
    @Prop({ type: String })
    countryCode?: string;

    @ApiProperty({ description: 'Phone number' })
    @Prop({ type: String, unique: true, sparse: true })
    phoneNumber?: string;

    @ApiProperty({ description: 'Wallet amount' })
    @Prop({ type: Number, default: 0 })
    walletAmount?: number;

    @ApiProperty({ description: 'Is account active' })
    @Prop({ type: Boolean, default: true })
    isActive?: boolean;

    @ApiProperty({ description: 'Is account verified' })
    @Prop({ type: Boolean, default: false })
    isVerify?: boolean;

    @ApiProperty({ description: 'Travel preference for lawyer' })
    @Prop({ type: String })
    travelPreference?: string;

    @ApiProperty({ description: 'Number of reviews received' })
    @Prop({ type: Number, default: 0 })
    reviewCount?: number;

    @ApiProperty({ description: 'Sum of all review ratings' })
    @Prop({ type: Number, default: 0 })
    reviewSum?: number;

    @ApiProperty({ description: 'User bio/description' })
    @Prop({ type: String })
    bio?: string;

    @ApiProperty({ description: 'User type', enum: UserType })
    @Prop({ type: String, enum: UserType, default: UserType.USER })
    userType?: UserType;

    @ApiProperty({ description: 'Full name of the user' })
    @Prop({ type: String })
    fullName?: string;

    @ApiProperty({ description: 'Lawyer specializations', type: [String] })
    @Prop({ type: [String], default: [] })
    specializations?: string[];

    @ApiProperty({ description: 'Services offered by lawyer', type: [String] })
    @Prop({ type: [String], default: [] })
    services?: string[];

    @ApiProperty({ description: 'Courts where lawyer practices', type: [String] })
    @Prop({ type: [String], default: [] })
    courts?: string[];

    @ApiProperty({ description: 'City of the user' })
    @Prop({ type: String })
    city?: string;

    @ApiProperty({ description: 'Complete address of the user' })
    @Prop({ type: String })
    completeAddress?: string;

    @ApiProperty({ description: 'Is address publicly visible' })
    @Prop({ type: Boolean, default: false })
    isAddressPublic?: boolean;

    @ApiProperty({ description: 'Years of experience as lawyer' })
    @Prop({ type: Number })
    yearsOfExperience?: number;

    @ApiProperty({ description: 'Languages spoken', type: [String] })
    @Prop({ type: [String], default: [] })
    languages?: string[];

    @ApiProperty({ description: 'Gender of the user', enum: Gender })
    @Prop({ type: String, enum: Gender })
    gender?: Gender;

    @ApiProperty({ description: 'Is user currently online' })
    @Prop({ type: Boolean, default: false })
    isOnline?: boolean;

    @ApiProperty({ description: 'Last seen timestamp' })
    @Prop({ type: Date })
    lastSeen?: Date;

    @ApiProperty({ description: 'Profile visibility setting', enum: Visibility })
    @Prop({ type: String, enum: Visibility, default: Visibility.PUBLIC })
    visibility?: Visibility;

    @ApiProperty({ description: 'Is lawyer onboarding completed' })
    @Prop({ type: Boolean, default: false })
    isOnboardingComplete?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add indexes for commonly queried fields
UserSchema.index({ userType: 1 });
UserSchema.index({ city: 1 });
UserSchema.index({ specializations: 1 });
UserSchema.index({ isActive: 1, isVerify: 1 });
