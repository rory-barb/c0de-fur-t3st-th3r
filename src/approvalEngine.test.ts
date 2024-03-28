import { expect, test, describe } from "bun:test";
import { isRefundApproved } from "./approvalEngine";

describe("Approved Cases - Should return true", () => {
  test("for a customer request by phone less than 4 hours from investment time", () => {
    const result = isRefundApproved({
      name: "JoJo",
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
});

describe("Failed Cases - Should return false", () => {
  test("for a customer request by phone greather than 4 hours from investment time", () => {
    const result = isRefundApproved({
      name: "Marky Mark",
      customerLocation: "US (PST)",
      signUpDate: "1/2/2020",
      requestSource: "phone",
      investmentDate: "1/2/2021",
      investmentTime: "06:00",
      refundRequestDate: "1/2/2021",
      refundRequestTime: "10:00",
    });

    expect(result).toBe(false);
  });
});
