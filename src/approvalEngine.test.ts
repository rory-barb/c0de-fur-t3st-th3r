import { expect, test } from "bun:test";
import { isRefundApproved } from "./approvalEngine";

test("Should return true for a customer request", () => {
  const result = isRefundApproved({
    name: "Emma Smith",
    customerLocation: "US (PST)",
    signUpDate: "1/2/2020",
    requestSource: "phone",
    investmentDate: "1/2/2021",
    investmentTime: "06:00",
    refundRequestDate: "1/2/2021",
    refundRequestTime: "09:00",
  });

  expect(result).toBe(true);
});
