import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum,
    IsNumber,
    IsBoolean,
    IsArray,
    ArrayMinSize,
    Min,
} from 'class-validator';
import { Gender } from '../schemas/user.schema';

export class LawyerOnboardingDto {
    @ApiProperty({ description: 'Full name of the lawyer' })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Lawyer specializations (e.g., Criminal Law, Family Law)', type: [String] })
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one specialization is required' })
    @IsString({ each: true })
    specializations: string[];

    @ApiProperty({ description: 'Services offered (e.g., Consultation, Court Representation)', type: [String] })
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one service is required' })
    @IsString({ each: true })
    services: string[];

    @ApiProperty({ description: 'Courts where lawyer practices (e.g., Supreme Court, High Court)', type: [String] })
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one court is required' })
    @IsString({ each: true })
    courts: string[];

    @ApiProperty({ description: 'Years of experience as a lawyer', minimum: 0 })
    @IsNumber()
    @Min(0)
    yearsOfExperience: number;

    @ApiProperty({ description: 'Languages spoken by the lawyer', type: [String] })
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one language is required' })
    @IsString({ each: true })
    languages: string[];

    @ApiProperty({ description: 'City where the lawyer practices' })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ description: 'Complete office/practice address' })
    @IsNotEmpty()
    @IsString()
    completeAddress: string;

    @ApiProperty({ description: 'Short bio/description about the lawyer' })
    @IsNotEmpty()
    @IsString()
    bio: string;

    @ApiProperty({ description: 'Gender of the lawyer', enum: Gender })
    @IsEnum(Gender)
    gender: Gender;

    @ApiPropertyOptional({ description: 'Profile picture URL' })
    @IsOptional()
    @IsString()
    profilePic?: string;

    @ApiPropertyOptional({ description: 'Is address publicly visible', default: false })
    @IsOptional()
    @IsBoolean()
    isAddressPublic?: boolean;

    @ApiPropertyOptional({ description: 'Travel preference for consultations' })
    @IsOptional()
    @IsString()
    travelPreference?: string;
}
