import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class UpdateEntryDto {
  @IsInt()
  @IsNotEmpty()
  readonly timestamp: number;

  @IsString()
  @IsOptional()
  readonly detail: string;
}
