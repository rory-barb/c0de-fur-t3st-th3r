import { expect, test, describe } from "bun:test";
import { refundStatus } from "./approvalEngine";

describe("Approved Cases - Should return true", () => {
  describe("by Phone", () => {
    describe("on old TOS", () => {
      test("for a customer request less than 4 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "JoJo",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2019",
          requestSource: "phone",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "1/2/2021",
          refundRequestTime: "09:59",
        });

        expect(isRefundApproved).toBe(true);
      });
    });

    describe("on new TOS", () => {
      test("for a customer request less than 24 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "JoJo",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2022",
          requestSource: "phone",
          investmentDate: "26/3/2024",
          investmentTime: "10:00",
          refundRequestDate: "27/3/2024",
          refundRequestTime: "09:00",
        });

        expect(isRefundApproved).toBe(true);
      });
    });
  });

  describe("by Web App", () => {
    describe("on old TOS", () => {
      test("for a customer request less than 8 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "JoJo",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2019",
          requestSource: "web app",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "1/2/2021",
          refundRequestTime: "13:59",
        });

        expect(isRefundApproved).toBe(true);
      });
    });

    describe("on new TOS", () => {
      test("for a customer request less than 16 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "JoJo",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2022",
          requestSource: "web app",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "1/2/2021",
          refundRequestTime: "21:59",
        });

        expect(isRefundApproved).toBe(true);
      });
    });
  });
});

describe("Failed Cases - Should return false", () => {
  describe("by Phone", () => {
    describe("on old TOS", () => {
      test("for a customer request greather than 4 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "Marky Mark",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2019",
          requestSource: "phone",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "1/2/2021",
          refundRequestTime: "15:05",
        });

        expect(isRefundApproved).toBe(false);
      });

      test("for a customer request exactly 4 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "Dr Dre",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2019",
          requestSource: "phone",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "1/2/2021",
          refundRequestTime: "10:00",
        });

        expect(isRefundApproved).toBe(false);
      });
    });

    describe("on new TOS", () => {
      test("for a customer request greather than 24 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "Marky Mark",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2022",
          requestSource: "phone",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "2/2/2021",
          refundRequestTime: "06:05",
        });

        expect(isRefundApproved).toBe(false);
      });

      test("for a customer request exactly 24 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "Dr Dre",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2022",
          requestSource: "phone",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "2/2/2021",
          refundRequestTime: "06:00",
        });

        expect(isRefundApproved).toBe(false);
      });

      test("for a customer request less than 24 hours for request but over 24 hours after waiting for opening hours", () => {
        const { isRefundApproved } = refundStatus({
          name: "JoJo",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2022",
          requestSource: "phone",
          investmentDate: "26/3/2024",
          investmentTime: "05:00",
          refundRequestDate: "27/3/2024",
          refundRequestTime: "04:00",
        });

        expect(isRefundApproved).toBe(false);
      });
    });
  });

  describe("by Web App", () => {
    describe("on old TOS", () => {
      test("for a customer request greather than 8 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "Marky Mark",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2019",
          requestSource: "web app",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "1/2/2021",
          refundRequestTime: "15:05",
        });

        expect(isRefundApproved).toBe(false);
      });

      test("for a customer request exactly 8 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "Dr Dre",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2019",
          requestSource: "web app",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "1/2/2021",
          refundRequestTime: "14:00",
        });

        expect(isRefundApproved).toBe(false);
      });
    });

    describe("on new TOS", () => {
      test("for a customer request greather than 16 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "Marky Mark",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2022",
          requestSource: "web app",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "1/2/2021",
          refundRequestTime: "22:05",
        });

        expect(isRefundApproved).toBe(false);
      });

      test("for a customer request exactly 16 hours from investment time", () => {
        const { isRefundApproved } = refundStatus({
          name: "Dr Dre",
          customerLocation: "Europe (GMT)",
          signUpDate: "1/2/2022",
          requestSource: "web app",
          investmentDate: "1/2/2021",
          investmentTime: "06:00",
          refundRequestDate: "1/2/2021",
          refundRequestTime: "22:00",
        });

        expect(isRefundApproved).toBe(false);
      });
    });
  });
});

describe("Boundary Testing", () => {
  test("when a customer signed up on the day of TOS should return false due to shorter old TOS window", () => {
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "Europe (GMT)",
      signUpDate: "2/1/2020",
      requestSource: "phone",
      investmentDate: "1/2/2021",
      investmentTime: "06:00",
      refundRequestDate: "1/2/2021",
      refundRequestTime: "11:00",
    });

    expect(isRefundApproved).toBe(false);
  });

  test("when a customer signed up on the day after TOS should return true due to shorter old TOS window", () => {
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "Europe (GMT)",
      signUpDate: "2/2/2020",
      requestSource: "phone",
      investmentDate: "1/2/2021",
      investmentTime: "06:00",
      refundRequestDate: "1/2/2021",
      refundRequestTime: "11:00",
    });

    expect(isRefundApproved).toBe(true);
  });

  describe("for American vs Euro Sign up dates", () => {
    test("when a US customer signed up on 1/3/2020 US should return true for a 5 hour phone refund due to longer new TOS window: After", () => {
      const { isRefundApproved } = refundStatus({
        name: "JoJo",
        customerLocation: "US (PST)",
        signUpDate: "1/3/2020",
        requestSource: "phone",
        investmentDate: "1/4/2021",
        investmentTime: "06:00",
        refundRequestDate: "1/4/2021",
        refundRequestTime: "11:00",
      });

      expect(isRefundApproved).toBe(true);
    });

    test("when a US customer signed up on 1/2/2020 US should return false for a 5 hour phone refund due to shorter old TOS window: Boundary", () => {
      const { isRefundApproved } = refundStatus({
        name: "JoJo",
        customerLocation: "US (PST)",
        signUpDate: "1/2/2020",
        requestSource: "phone",
        investmentDate: "1/2/2021",
        investmentTime: "06:00",
        refundRequestDate: "1/2/2021",
        refundRequestTime: "11:00",
      });

      expect(isRefundApproved).toBe(false);
    });

    test("when a US customer signed up on 1/2/2020 US should return false for a 5 hour phone refund due to shorter old TOS window: Before", () => {
      const { isRefundApproved } = refundStatus({
        name: "JoJo",
        customerLocation: "US (PST)",
        signUpDate: "1/1/2020",
        requestSource: "phone",
        investmentDate: "1/2/2021",
        investmentTime: "06:00",
        refundRequestDate: "1/2/2021",
        refundRequestTime: "11:00",
      });

      expect(isRefundApproved).toBe(false);
    });

    test("when a Euro customer signed up on 3/1/2020 Euro should return true for a 5 hour phone refund due to longer new TOS window: After", () => {
      const { isRefundApproved } = refundStatus({
        name: "JoJo",
        customerLocation: "Europe (GMT)",
        signUpDate: "3/1/2020",
        requestSource: "phone",
        investmentDate: "1/2/2021",
        investmentTime: "06:00",
        refundRequestDate: "1/2/2021",
        refundRequestTime: "11:00",
      });

      expect(isRefundApproved).toBe(true);
    });

    test("when a Euro customer signed up on 2/1/2020 Euro should return false for a 5 hour phone refund due to shorter old TOS window: Equal", () => {
      const { isRefundApproved } = refundStatus({
        name: "JoJo",
        customerLocation: "Europe (GMT)",
        signUpDate: "2/1/2020",
        requestSource: "phone",
        investmentDate: "1/2/2021",
        investmentTime: "06:00",
        refundRequestDate: "1/2/2021",
        refundRequestTime: "11:00",
      });

      expect(isRefundApproved).toBe(false);
    });

    test("when a Euro customer signed up on 1/1/2020 Euro should return false for a 5 hour phone refund due to shorter old TOS window: Before", () => {
      const { isRefundApproved } = refundStatus({
        name: "JoJo",
        customerLocation: "Europe (GMT)",
        signUpDate: "1/1/2020",
        requestSource: "phone",
        investmentDate: "1/2/2021",
        investmentTime: "06:00",
        refundRequestDate: "1/2/2021",
        refundRequestTime: "11:00",
      });

      expect(isRefundApproved).toBe(false);
    });
  });
});

describe("Phonecall Voicemail Out of Hour Refunds respond appropriately", () => {
  test("when a customer uses web app should log refund instantly even outside of 9-5 weekday hours and approve when under time limit", () => {
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "Europe (GMT)",
      signUpDate: "2/1/2019",
      requestSource: "web app",
      investmentDate: "30/3/2024",
      investmentTime: "19:00",
      refundRequestDate: "31/3/2024",
      refundRequestTime: "02:59",
    });

    expect(isRefundApproved).toBe(true);
  });

  test("when a customer uses phone should register refund when 9-5 weekday hours starts and approve when still under time limit", () => {
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "Europe (GMT)",
      signUpDate: "2/1/2022",
      requestSource: "phone",
      investmentDate: "28/3/2024", // Thursday work hours
      investmentTime: "14:30",
      refundRequestDate: "29/3/2024", // Friday Work hours 09:00 will be under 24 hours from the Investment.
      refundRequestTime: "06:00",
    });

    expect(isRefundApproved).toBe(true);
  });

  test("when a customer uses phone should register refund when 9-5 weekday hours starts and reject when above time limit", () => {
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "Europe (GMT)",
      signUpDate: "2/1/2019",
      requestSource: "phone",
      investmentDate: "29/3/2024", // Friday before Out of hours
      investmentTime: "04:30",
      refundRequestDate: "29/3/2024", // Friday Work hours 09:00 will be over 4 hours from the Investment.
      refundRequestTime: "05:01",
    });

    expect(isRefundApproved).toBe(false);
  });

  test("when a customer uses phone should register refund when 9-5 weekday hours starts and reject when above time due to end of workday friday", () => {
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "Europe (GMT)",
      signUpDate: "2/1/2019",
      requestSource: "phone",
      investmentDate: "29/3/2024", // Friday After Out of hours
      investmentTime: "16:55",
      refundRequestDate: "29/3/2024", // Monda Work hours 09:00 will be over 4 hours from the Investment.
      refundRequestTime: "17:01",
    });

    expect(isRefundApproved).toBe(false);
  });

  test("when a customer uses phone should register refund when 9-5 weekday hours starts and reject when initiated on weekend", () => {
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "Europe (GMT)",
      signUpDate: "2/1/2024",
      requestSource: "phone",
      investmentDate: "30/3/2024", // Saturday Out of hours
      investmentTime: "16:55",
      refundRequestDate: "1/4/2024", // Monday Work hours 09:00 will be over 24 hours from the Investment.
      refundRequestTime: "17:01",
    });

    expect(isRefundApproved).toBe(false);
  });

  test("when a customer uses phone should register refund when 9-5 weekday hours starts and accept when initiated and refunded on sunday", () => {
    // if placed by web app on Sunday
    // refunded by phone call on Sunday
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "Europe (GMT)",
      signUpDate: "2/1/2024",
      requestSource: "phone",
      investmentDate: "31/3/2024", // Sunday Out of hours
      investmentTime: "16:55",
      refundRequestDate: "31/3/2024", // Monday Work hours 09:00 will be under 24 hours from the Investment.
      refundRequestTime: "17:01",
    });

    expect(isRefundApproved).toBe(true);
  });
});

describe("Timezones: Voicemail Out of Hour Refunds respond appropriately", () => {
  test("when a customer should be able to not wait on out of hours if they are outside of 9-5 locally but inside GMT 9-5 ", () => {
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "US (EST)",
      signUpDate: "2/1/2019",
      requestSource: "phone",
      investmentDate: "3/29/2024",
      investmentTime: "04:01", // over than 4 hours to opening hour 'in local' but uk is open currently
      refundRequestDate: "3/29/2024",
      refundRequestTime: "05:02",
    });

    expect(isRefundApproved).toBe(true);
  });
  test("when a customer should still be treated as out of hours when in 9-5 but not GMT timezone", () => {
    const { isRefundApproved } = refundStatus({
      name: "JoJo",
      customerLocation: "Europe (CET)",
      signUpDate: "2/1/2019",
      requestSource: "phone",
      investmentDate: "29/3/2024",
      investmentTime: "05:00", // under 4 hours to working hours locally, but the extra hour makes it 5
      refundRequestDate: "29/3/2024",
      refundRequestTime: "09:40",
    });

    expect(isRefundApproved).toBe(false);
  });
});

describe("Bug Fix Tests:", () => {
  test("customer who refunds 7 hours later should have a minimum refund time of 7 hours even if out of hours opens sooner", () => {
    // Addressing bug in out of hours time calculations not converting to UK time first.
    const response = refundStatus({
      name: "Wilson Doug",
      customerLocation: "US (PST)",
      signUpDate: "2/1/2020",
      requestSource: "phone",
      investmentDate: "2/1/2021",
      investmentTime: "22:00",
      refundRequestDate: "2/2/2021",
      refundRequestTime: "5:00",
    });

    expect(response.isRefundApproved).toBe(true);
    expect(response.hoursBeforeRefundRequest).toBe(7);
  });
});
