import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsOptional,
    IsEnum,
    IsNumber,
    IsBoolean,
    IsArray,
    Min,
} from 'class-validator';
import { LoginType, UserType, Gender, Visibility } from '../schemas/user.schema';

export class CreateProfileDto {
    @ApiPropertyOptional({ description: 'User email address' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ description: 'Login type', enum: LoginType })
    @IsOptional()
    @IsEnum(LoginType)
    loginType?: LoginType;

    @ApiPropertyOptional({ description: 'Profile picture URL' })
    @IsOptional()
    @IsString()
    profilePic?: string;

    @ApiPropertyOptional({ description: 'Firebase Cloud Messaging token' })
    @IsOptional()
    @IsString()
    fcmToken?: string;

    @ApiPropertyOptional({ description: 'Country code for phone number' })
    @IsOptional()
    @IsString()
    countryCode?: string;

    @ApiPropertyOptional({ description: 'Phone number' })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiPropertyOptional({ description: 'Wallet amount' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    walletAmount?: number;

    @ApiPropertyOptional({ description: 'Is account active' })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ description: 'Is account verified' })
    @IsOptional()
    @IsBoolean()
    isVerify?: boolean;

    @ApiPropertyOptional({ description: 'Travel preference for lawyer' })
    @IsOptional()
    @IsString()
    travelPreference?: string;

    @ApiPropertyOptional({ description: 'User bio/description' })
    @IsOptional()
    @IsString()
    bio?: string;

    @ApiPropertyOptional({ description: 'User type', enum: UserType })
    @IsOptional()
    @IsEnum(UserType)
    userType?: UserType;

    @ApiPropertyOptional({ description: 'Full name of the user' })
    @IsOptional()
    @IsString()
    fullName?: string;

    @ApiPropertyOptional({ description: 'Lawyer specializations', type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    specializations?: string[];

    @ApiPropertyOptional({ description: 'Services offered by lawyer', type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    services?: string[];

    @ApiPropertyOptional({ description: 'Courts where lawyer practices', type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    courts?: string[];

    @ApiPropertyOptional({ description: 'City of the user' })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({ description: 'Complete address of the user' })
    @IsOptional()
    @IsString()
    completeAddress?: string;

    @ApiPropertyOptional({ description: 'Is address publicly visible' })
    @IsOptional()
    @IsBoolean()
    isAddressPublic?: boolean;

    @ApiPropertyOptional({ description: 'Years of experience as lawyer' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    yearsOfExperience?: number;

    @ApiPropertyOptional({ description: 'Languages spoken', type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    languages?: string[];

    @ApiPropertyOptional({ description: 'Gender of the user', enum: Gender })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @ApiPropertyOptional({ description: 'Is user currently online' })
    @IsOptional()
    @IsBoolean()
    isOnline?: boolean;

    @ApiPropertyOptional({ description: 'Profile visibility setting', enum: Visibility })
    @IsOptional()
    @IsEnum(Visibility)
    visibility?: Visibility;
}
