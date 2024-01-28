import { ApiProperty } from "@nestjs/swagger";

import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIP,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { If, IsPortNumber } from "@/common/validators";

class ServerConfig {
  @IsIP()
  readonly hostname!: string;

  @IsPortNumber()
  readonly port!: number;

  @IsArray()
  @IsString({ each: true })
  readonly trustProxy!: string;

  @IsString()
  readonly globalAPIPathPrefix!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly clusters?: number;
}

class ServicesConfigDatabase {
  @IsIn(["mysql", "mariadb"])
  readonly type!: "mysql" | "mariadb";

  @IsString()
  readonly host!: string;

  @IsPortNumber()
  readonly port!: number;

  @IsString()
  readonly username!: string;

  @IsString()
  readonly password!: string;

  @IsString()
  readonly database!: string;

  @IsString()
  readonly timezone?: string = "local";
}

class ServicesConfigMinio {
  @IsUrl({ require_tld: false })
  readonly endpoint!: string;

  @IsString()
  readonly accessKey!: string;

  @IsString()
  readonly secretKey!: string;

  @IsString()
  readonly bucket!: string;
}

class ServicesConfigMail {
  @IsEmail()
  @IsOptional()
  readonly address!: string;

  readonly transport: unknown;
}

class ServicesConfig {
  @ValidateNested()
  @Type(() => ServicesConfigDatabase)
  readonly database!: ServicesConfigDatabase;

  @ValidateNested()
  @Type(() => ServicesConfigMinio)
  readonly minio!: ServicesConfigMinio;

  @IsString()
  readonly redis!: string;

  @ValidateNested()
  @Type(() => ServicesConfigMail)
  readonly mail!: ServicesConfigMail;
}

class SecurityConfigCrossOrigin {
  @IsBoolean()
  readonly enabled!: boolean;

  @IsString({
    each: true,
  })
  readonly whiteList!: string[];
}

class SecurityConfigRecaptcha {
  @IsString()
  @IsOptional()
  readonly secretKey!: string;

  @IsBoolean()
  readonly useRecaptchaNet!: boolean;

  @IsString()
  @IsOptional()
  readonly proxyUrl!: string;
}

class SecurityConfigRateLimit {
  @IsInt()
  readonly maxRequests!: number;

  @IsInt()
  readonly durationSeconds!: number;
}

class SecurityConfig {
  @IsString()
  readonly sessionSecret!: string;

  @ValidateNested()
  @Type(() => SecurityConfigRecaptcha)
  readonly recaptcha!: SecurityConfigRecaptcha;

  @ValidateNested()
  @Type(() => SecurityConfigCrossOrigin)
  readonly crossOrigin!: SecurityConfigCrossOrigin;

  @ValidateNested()
  @Type(() => SecurityConfigRateLimit)
  @IsOptional()
  readonly rateLimit!: SecurityConfigRateLimit;
}

// These config items will be sent to client
export class PreferenceConfig {
  @IsString()
  @ApiProperty()
  readonly siteName!: string;
}

class EventReportConfig {
  @IsString()
  @IsOptional()
  readonly telegramBotToken?: string;

  @IsUrl()
  @IsOptional()
  readonly telegramApiRoot?: string;

  @If(value => typeof value === "string" || typeof value === "number")
  @IsOptional()
  readonly sentTo?: string | number;

  @IsString()
  @IsOptional()
  readonly proxyUrl?: string;
}

class VendorIp2RegionConfig {
  @IsString()
  readonly ipv4db!: string;

  @IsString()
  readonly ipv6db!: string;
}

class VendorConfig {
  @ValidateNested()
  @Type(() => VendorIp2RegionConfig)
  @IsOptional()
  readonly ip2region!: VendorIp2RegionConfig;
}

export class AppConfig {
  @ValidateNested()
  @Type(() => ServerConfig)
  readonly server!: ServerConfig;

  @ValidateNested()
  @Type(() => ServicesConfig)
  readonly services!: ServicesConfig;

  @ValidateNested()
  @Type(() => SecurityConfig)
  readonly security!: SecurityConfig;

  @ValidateNested()
  @Type(() => PreferenceConfig)
  readonly preference!: PreferenceConfig;

  @ValidateNested()
  @Type(() => EventReportConfig)
  @IsOptional()
  readonly eventReport?: EventReportConfig;

  @ValidateNested()
  @Type(() => VendorConfig)
  @IsOptional()
  readonly vendor?: VendorConfig;
}
