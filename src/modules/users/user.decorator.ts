import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: any, req: any) => req.user);
