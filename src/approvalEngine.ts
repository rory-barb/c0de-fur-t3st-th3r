import { CustomerRequest } from "./customerRequests";

const determineCustomersRefundWindow = () => {
  return 4;
};

const determineHoursBeforeRefundRequest = (
  investmentDate: string,
  investmentTime: string,
  refundRequestDate: string,
  refundRequestTime: string
) => {
  const investmentTimestamp = new Date(`${investmentDate} ${investmentTime}`);
  const refundRequestTimestamp = new Date(
    `${refundRequestDate} ${refundRequestTime}`
  );

  return Math.abs(+investmentTimestamp - +refundRequestTimestamp) / 36e5;
};

export const isRefundApproved = (customerRequest: CustomerRequest) => {
  const {
    investmentDate,
    investmentTime,
    refundRequestDate,
    refundRequestTime,
  } = customerRequest;

  const hoursBeforeRefundRequest = determineHoursBeforeRefundRequest(
    investmentDate,
    investmentTime,
    refundRequestDate,
    refundRequestTime
  );

  const customersRefundWindow = determineCustomersRefundWindow();

  if (hoursBeforeRefundRequest >= customersRefundWindow) return false;

  return true;
};
