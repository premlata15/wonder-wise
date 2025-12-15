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
  {
    if (this.budget) {
      this.budget.spent = this.budget.expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      console.log("Calculated spent on save:", this.budget.spent);
    }
    next();
  }
});

TripSchema.pre("findOneAndUpdate", function () {
  if (this.getUpdate().budget) {
    this.getUpdate().budget.spent +=
      this.getUpdate().budget?.expenses?.reduce(
        (acc, expense) => acc + expense.amount,
        0
      ) || 0;
    console.log("Updated spent:", this.getUpdate().budget.spent);
    this.getUpdate().budget.expenses?.map((expense) => {
      expense.date = new Date();
    });
  }
});

const Trip = model("Trip", TripSchema);

export default Trip;
