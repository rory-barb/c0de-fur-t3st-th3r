import { useState } from "react";
import furtherLogo from "./assets/logo.webp";
import { customerRequests } from "./customerRequests";
import { isRefundApproved } from "./approvalEngine";

function App() {
  return (
    <>
      <div className="flex flex-col gap-10 p-4 border rounded">
        <img className="w-80 mx-auto" src={furtherLogo} alt="Vite logo" />

        <div className="p-4 border">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100 font-degular font-normal text-left text-lg">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Approved</th>
                <th className="p-2">Location</th>
                <th className="p-2">Sign up date</th>
                <th className="p-2">Request Source</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Refund Date</th>
                <th className="p-2">Refund Time</th>
              </tr>
            </thead>
            <tbody className="font-degular font-normal text-lg">
              {customerRequests.map((item, index) => (
                <tr key={index} className="border-top border-b-2 border mb-6">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">
                    {isRefundApproved(item) ? "✅" : "❌"}
                  </td>
                  <td className="p-4">{item.customerLocation}</td>
                  <td className="p-4">{item.signUpDate}</td>
                  <td className="p-4">{item.requestSource}</td>
                  <td className="p-4">{item.investmentDate}</td>
                  <td className="p-4">{item.investmentTime}</td>
                  <td className="p-4">{item.refundRequestDate}</td>
                  <td className="p-4">{item.refundRequestTime}</td>
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
