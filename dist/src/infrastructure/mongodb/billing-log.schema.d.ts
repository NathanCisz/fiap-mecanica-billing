import { Document } from 'mongoose';
export type BillingLogDocument = BillingLog & Document;
export declare class BillingLog {
    event: string;
    serviceOrderId: string;
    budgetId?: string;
    paymentId?: string;
    payload: Record<string, any>;
    level: string;
}
export declare const BillingLogSchema: import("mongoose").Schema<BillingLog, import("mongoose").Model<BillingLog, any, any, any, any, any, BillingLog>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BillingLog, Document<unknown, {}, BillingLog, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<BillingLog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    event?: import("mongoose").SchemaDefinitionProperty<string, BillingLog, Document<unknown, {}, BillingLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BillingLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    serviceOrderId?: import("mongoose").SchemaDefinitionProperty<string, BillingLog, Document<unknown, {}, BillingLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BillingLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    budgetId?: import("mongoose").SchemaDefinitionProperty<string | undefined, BillingLog, Document<unknown, {}, BillingLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BillingLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    paymentId?: import("mongoose").SchemaDefinitionProperty<string | undefined, BillingLog, Document<unknown, {}, BillingLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BillingLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    payload?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, BillingLog, Document<unknown, {}, BillingLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BillingLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    level?: import("mongoose").SchemaDefinitionProperty<string, BillingLog, Document<unknown, {}, BillingLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BillingLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, BillingLog>;
