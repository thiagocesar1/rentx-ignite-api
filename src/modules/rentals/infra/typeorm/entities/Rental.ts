import { v4 as uuidV4 } from "uuid";

class Rental {
  id: string;
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  expectedReturnDate: Date;
  total: number;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
