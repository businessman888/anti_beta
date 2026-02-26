import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AnalyzeImageDto {
    @IsString()
    @IsNotEmpty()
    imageBase64: string;

    @IsString()
    @IsNotEmpty()
    imageType: string;

    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}
