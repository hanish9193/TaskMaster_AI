import z from 'zod';
export declare const TextPartSchema: z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodOptional<z.ZodNever>;
    media: z.ZodOptional<z.ZodNever>;
    toolRequest: z.ZodOptional<z.ZodNever>;
    toolResponse: z.ZodOptional<z.ZodNever>;
    data: z.ZodOptional<z.ZodUnknown>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, {
    text: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    text: string;
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    media?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}, {
    text: string;
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    media?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}>;
export type TextPart = z.infer<typeof TextPartSchema>;
export declare const MediaSchema: z.ZodObject<{
    contentType: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    contentType?: string | undefined;
}, {
    url: string;
    contentType?: string | undefined;
}>;
export declare const MediaPartSchema: z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodOptional<z.ZodNever>;
    media: z.ZodOptional<z.ZodNever>;
    toolRequest: z.ZodOptional<z.ZodNever>;
    toolResponse: z.ZodOptional<z.ZodNever>;
    data: z.ZodOptional<z.ZodUnknown>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, {
    media: z.ZodObject<{
        contentType: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        contentType?: string | undefined;
    }, {
        url: string;
        contentType?: string | undefined;
    }>;
}>, "strip", z.ZodTypeAny, {
    media: {
        url: string;
        contentType?: string | undefined;
    };
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}, {
    media: {
        url: string;
        contentType?: string | undefined;
    };
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}>;
export type MediaPart = z.infer<typeof MediaPartSchema>;
export declare const ToolRequestSchema: z.ZodObject<{
    ref: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    input: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    name: string;
    ref?: string | undefined;
    input?: unknown;
}, {
    name: string;
    ref?: string | undefined;
    input?: unknown;
}>;
export declare const ToolRequestPartSchema: z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodOptional<z.ZodNever>;
    media: z.ZodOptional<z.ZodNever>;
    toolRequest: z.ZodOptional<z.ZodNever>;
    toolResponse: z.ZodOptional<z.ZodNever>;
    data: z.ZodOptional<z.ZodUnknown>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, {
    toolRequest: z.ZodObject<{
        ref: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        input: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        ref?: string | undefined;
        input?: unknown;
    }, {
        name: string;
        ref?: string | undefined;
        input?: unknown;
    }>;
}>, "strip", z.ZodTypeAny, {
    toolRequest: {
        name: string;
        ref?: string | undefined;
        input?: unknown;
    };
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    media?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}, {
    toolRequest: {
        name: string;
        ref?: string | undefined;
        input?: unknown;
    };
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    media?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}>;
export type ToolRequestPart = z.infer<typeof ToolRequestPartSchema>;
export declare const ToolResponseSchema: z.ZodObject<{
    ref: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    output: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    name: string;
    ref?: string | undefined;
    output?: unknown;
}, {
    name: string;
    ref?: string | undefined;
    output?: unknown;
}>;
export declare const ToolResponsePartSchema: z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodOptional<z.ZodNever>;
    media: z.ZodOptional<z.ZodNever>;
    toolRequest: z.ZodOptional<z.ZodNever>;
    toolResponse: z.ZodOptional<z.ZodNever>;
    data: z.ZodOptional<z.ZodUnknown>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, {
    toolResponse: z.ZodObject<{
        ref: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        output: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        ref?: string | undefined;
        output?: unknown;
    }, {
        name: string;
        ref?: string | undefined;
        output?: unknown;
    }>;
}>, "strip", z.ZodTypeAny, {
    toolResponse: {
        name: string;
        ref?: string | undefined;
        output?: unknown;
    };
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    media?: undefined;
    toolRequest?: undefined;
    data?: unknown;
}, {
    toolResponse: {
        name: string;
        ref?: string | undefined;
        output?: unknown;
    };
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    media?: undefined;
    toolRequest?: undefined;
    data?: unknown;
}>;
export type ToolResponsePart = z.infer<typeof ToolResponsePartSchema>;
export declare const DataPartSchema: z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodOptional<z.ZodNever>;
    media: z.ZodOptional<z.ZodNever>;
    toolRequest: z.ZodOptional<z.ZodNever>;
    toolResponse: z.ZodOptional<z.ZodNever>;
    data: z.ZodOptional<z.ZodUnknown>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, {
    data: z.ZodUnknown;
}>, "strip", z.ZodTypeAny, {
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    media?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}, {
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    media?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}>;
export type DataPart = z.infer<typeof DataPartSchema>;
export declare const CustomPartSchema: z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodOptional<z.ZodNever>;
    media: z.ZodOptional<z.ZodNever>;
    toolRequest: z.ZodOptional<z.ZodNever>;
    toolResponse: z.ZodOptional<z.ZodNever>;
    data: z.ZodOptional<z.ZodUnknown>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, {
    custom: z.ZodRecord<z.ZodString, z.ZodAny>;
}>, "strip", z.ZodTypeAny, {
    custom: Record<string, any>;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    media?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}, {
    custom: Record<string, any>;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    media?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}>;
export type CustomPart = z.infer<typeof CustomPartSchema>;
export declare const DocumentPartSchema: z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodOptional<z.ZodNever>;
    media: z.ZodOptional<z.ZodNever>;
    toolRequest: z.ZodOptional<z.ZodNever>;
    toolResponse: z.ZodOptional<z.ZodNever>;
    data: z.ZodOptional<z.ZodUnknown>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, {
    text: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    text: string;
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    media?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}, {
    text: string;
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    media?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}>, z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodOptional<z.ZodNever>;
    media: z.ZodOptional<z.ZodNever>;
    toolRequest: z.ZodOptional<z.ZodNever>;
    toolResponse: z.ZodOptional<z.ZodNever>;
    data: z.ZodOptional<z.ZodUnknown>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, {
    media: z.ZodObject<{
        contentType: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        contentType?: string | undefined;
    }, {
        url: string;
        contentType?: string | undefined;
    }>;
}>, "strip", z.ZodTypeAny, {
    media: {
        url: string;
        contentType?: string | undefined;
    };
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}, {
    media: {
        url: string;
        contentType?: string | undefined;
    };
    custom?: Record<string, unknown> | undefined;
    metadata?: Record<string, unknown> | undefined;
    text?: undefined;
    toolRequest?: undefined;
    toolResponse?: undefined;
    data?: unknown;
}>]>;
export type DocumentPart = z.infer<typeof DocumentPartSchema>;
export declare const DocumentDataSchema: z.ZodObject<{
    content: z.ZodArray<z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
        text: z.ZodOptional<z.ZodNever>;
        media: z.ZodOptional<z.ZodNever>;
        toolRequest: z.ZodOptional<z.ZodNever>;
        toolResponse: z.ZodOptional<z.ZodNever>;
        data: z.ZodOptional<z.ZodUnknown>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, {
        text: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        text: string;
        custom?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
        media?: undefined;
        toolRequest?: undefined;
        toolResponse?: undefined;
        data?: unknown;
    }, {
        text: string;
        custom?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
        media?: undefined;
        toolRequest?: undefined;
        toolResponse?: undefined;
        data?: unknown;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        text: z.ZodOptional<z.ZodNever>;
        media: z.ZodOptional<z.ZodNever>;
        toolRequest: z.ZodOptional<z.ZodNever>;
        toolResponse: z.ZodOptional<z.ZodNever>;
        data: z.ZodOptional<z.ZodUnknown>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        custom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, {
        media: z.ZodObject<{
            contentType: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            contentType?: string | undefined;
        }, {
            url: string;
            contentType?: string | undefined;
        }>;
    }>, "strip", z.ZodTypeAny, {
        media: {
            url: string;
            contentType?: string | undefined;
        };
        custom?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
        text?: undefined;
        toolRequest?: undefined;
        toolResponse?: undefined;
        data?: unknown;
    }, {
        media: {
            url: string;
            contentType?: string | undefined;
        };
        custom?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
        text?: undefined;
        toolRequest?: undefined;
        toolResponse?: undefined;
        data?: unknown;
    }>]>, "many">;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    content: ({
        text: string;
        custom?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
        media?: undefined;
        toolRequest?: undefined;
        toolResponse?: undefined;
        data?: unknown;
    } | {
        media: {
            url: string;
            contentType?: string | undefined;
        };
        custom?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
        text?: undefined;
        toolRequest?: undefined;
        toolResponse?: undefined;
        data?: unknown;
    })[];
    metadata?: Record<string, any> | undefined;
}, {
    content: ({
        text: string;
        custom?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
        media?: undefined;
        toolRequest?: undefined;
        toolResponse?: undefined;
        data?: unknown;
    } | {
        media: {
            url: string;
            contentType?: string | undefined;
        };
        custom?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
        text?: undefined;
        toolRequest?: undefined;
        toolResponse?: undefined;
        data?: unknown;
    })[];
    metadata?: Record<string, any> | undefined;
}>;
export type DocumentData = z.infer<typeof DocumentDataSchema>;
