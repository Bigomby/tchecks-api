import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateEntryDto {
  @IsInt()
  @IsOptional()
  readonly timestamp: number;

  @IsString()
  readonly detail: string;
}
