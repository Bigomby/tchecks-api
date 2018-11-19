import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTeacherDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly code: string;
}
