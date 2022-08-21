import { ApiProperty } from "@nestjs/swagger";

export class GetVersionResponseDto {
  @ApiProperty()
  version!: string;

  @ApiProperty()
  gitRepoVersion!: string;
}
