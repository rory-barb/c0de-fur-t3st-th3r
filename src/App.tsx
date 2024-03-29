import furtherLogo from "./assets/logo.webp";
import { customerRequests } from "./customerRequests";
import { refundStatus } from "./approvalEngine";

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
} as const;

const dateFormat = new Intl.DateTimeFormat("en-GB", options);
const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  ...options,
  hour: "numeric",
  minute: "numeric",
});

function App() {
  return (
    <>
      <div className="flex flex-col gap-10 p-4 border rounded">
        <img className="w-80 mx-auto" src={furtherLogo} alt="Vite logo" />

        <div className="p-4 border">
          <h1 className="text-3xl pb-3">Refund Attempts</h1>
          <h2 className="pb-3">All date/time in GMT</h2>
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Refunded</th>
                <th className="p-2">Location</th>
                <th className="p-2">Signed Up</th>
                <th className="p-2">Source</th>
                <th className="p-2">Refund Delay / Permitted</th>
                <th className="p-2">Invested At</th>
                <th className="p-2">Refund Registered At</th>
              </tr>
            </thead>
            <tbody className="">
              {customerRequests.map((item, index) => (
                <tr key={index} className="border-top border-b-2 border mb-6">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">
                    {refundStatus(item).isRefundApproved ? "✅" : "❌"}
                  </td>
                  <td className="p-4">{item.customerLocation}</td>
                  <td className="p-4">
                    {dateFormat.format(refundStatus(item).signUpDate)}{" "}
                    {refundStatus(item).isNewTOSCustomer && "- 🆕"}
                  </td>
                  <td className="p-4">
                    {item.requestSource === "phone" ? "📞" : "💻"}
                  </td>
                  <td className="p-4">
                    {refundStatus(item).hoursBeforeRefundRequest} /{" "}
                    {refundStatus(item).customersRefundWindow} hours
                  </td>
                  <td className="p-4">
                    {dateTimeFormat.format(
                      refundStatus(item).localInvestmentTimeStamp
                    )}
                  </td>
                  <td className="p-4">
                    {dateTimeFormat.format(
                      refundStatus(item).refundRequestTimestamp
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
