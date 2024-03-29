import {
  CustomerLocationTypes,
  CustomerRequest,
  RequestSourceTypes,
} from "./customerRequests";

const newTOSDate = new Date("1/2/2020"); // US Date Jan 2nd 2020

const determineCustomersRefundWindow = (
  source: RequestSourceTypes,
  isNewTOSCustomer: boolean
) => {
  if (source === "phone") {
    return isNewTOSCustomer ? 24 : 4;
  }

  if (source === "web app") {
    return isNewTOSCustomer ? 16 : 8;
  }

  return 0; // no refund window if unknown request source
};

const standardiseDateToAmerican = (
  date: string,
  location: CustomerLocationTypes
) => {
  if (location.includes("US")) return date;

  const day = date.split("/")[0];
  const month = date.split("/")[1];
  const year = date.split("/")[2];

  return `${month}/${day}/${year}`;
};

const calculateHoursBeforeRefundRequest = (
  investmentTimestamp: Date,
  refundRequestTimestamp: Date
) => {
  return Math.abs(+investmentTimestamp - +refundRequestTimestamp) / 36e5;
};

const determineNextAvailableRefundDate = (
  refundRequestDate: string,
  refundRequestTime: string,
  isPhone: boolean,
  location: CustomerLocationTypes
) => {
  const originalRefundTimestamp = new Date(
    `${refundRequestDate} ${refundRequestTime}`
  );

  const localRefundTimestamp = standardiseDatesToUKTimezone(
    originalRefundTimestamp,
    location
  );

  if (!isPhone) return localRefundTimestamp;

  const day = localRefundTimestamp.getDay();

  const workStart = 900;
  const workEnd = 1700;
  const refundTime = +refundRequestTime.replace(":", "");

  const isWorkHours = workStart <= refundTime && refundTime <= workEnd;

  // Weekdays
  if (day <= 5 && day != 0) {
    if (isWorkHours) {
      // working hours valid refund
      return localRefundTimestamp;
    } else {
      if (refundTime <= workStart) {
        // prior to work next working hours when work opens
        return new Date(`${localRefundTimestamp.toDateString()} 09:00`);
      } else {
        // post work next working hours when work opens
        const weekday = new Date(
          `${localRefundTimestamp.toDateString()} 09:00`
        );

        const daysToAdd = day === 5 ? 3 : 1;
        return new Date(weekday.setDate(weekday.getDate() + daysToAdd));
      }
    }
  } else {
    // Weekends
    const date = new Date(`${refundRequestDate} 09:00`);

    const daysToAdd = day === 0 ? 1 : 2;
    return new Date(date.setDate(date.getDate() + daysToAdd));
  }
};

const standardiseDatesToUKTimezone = (
  timestamp: Date,
  location: CustomerLocationTypes
) => {
  let modifier;

  switch (location) {
    case "US (PST)":
      modifier = +7;
      break;
    case "US (EST)":
      modifier = +4;
      break;
    case "Europe (CET)":
      modifier = -1;
      break;
    default:
      modifier = 0;
      break;
  }

  return new Date(
    timestamp.setTime(timestamp.getTime() + modifier * 60 * 60 * 1000)
  );
};

export const isRefundApproved = (customerRequest: CustomerRequest) => {
  const {
    investmentTime,
    refundRequestTime,
    requestSource,
    customerLocation,
    investmentDate,
    refundRequestDate,
    signUpDate,
  } = customerRequest;

  const isNewTOSCustomer =
    new Date(standardiseDateToAmerican(signUpDate, customerLocation)) >
    newTOSDate;

  const investmentTimestamp = new Date(
    `${standardiseDateToAmerican(
      investmentDate,
      customerLocation
    )} ${investmentTime}`
  );

  const localInvestmentTimeStamp = standardiseDatesToUKTimezone(
    investmentTimestamp,
    customerLocation
  );

  const refundRequestTimestamp = determineNextAvailableRefundDate(
    standardiseDateToAmerican(refundRequestDate, customerLocation),
    refundRequestTime,
    requestSource === "phone",
    customerLocation
  );

  const hoursBeforeRefundRequest = calculateHoursBeforeRefundRequest(
    localInvestmentTimeStamp,
    refundRequestTimestamp
  );

  const customersRefundWindow = determineCustomersRefundWindow(
    requestSource,
    isNewTOSCustomer
  );

  if (hoursBeforeRefundRequest >= customersRefundWindow) return false;

  return true;
};
