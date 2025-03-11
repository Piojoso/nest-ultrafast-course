import { Type } from "@nestjs/class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateEpisodeDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsDate()
  @Type(() => Date)
  publisedAt: Date;
}