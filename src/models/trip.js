import { Schema, model } from "mongoose";

const ExpenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const BudgetSchema = new Schema({
  total: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    default: 0,
  },
  expenses: [ExpenseSchema],
});

const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  destinations: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  budget: BudgetSchema,
});
TripSchema.pre("save", function (next) {
  if (this.budget && this.budget.expenses) {
    this.budget.spent = this.budget.expenses.reduce(
      (Sum, expense) => Sum + expense.amount,
      0
    );
  }
  next();
});

const Trip = model("Trip", TripSchema);

export default Trip;
