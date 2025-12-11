import { Schema,model } from "mongoose"
const BaggageSchema = new Schema(
    {
        trip:
        {
            type: Schema.Types.ObjectId,
            ref: "Trip",
            required: true,
        },
        name:
        {
            type: String,
            required: true,
            unique: true,
        },
        completed:
        {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: false }
);
export default model("Baggage", BaggageSchema);