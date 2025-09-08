export class ResponseDto<T> {
  readonly success!: boolean;
  readonly data?: T;
  readonly error?: string;

  // Return a plain object so RSC can serialize it
  constructor(args: { success: boolean; data?: T; error?: string; statusCode?: number }) {
    return { success: args.success, data: args.data, error: args.error } as any;
  }
}
