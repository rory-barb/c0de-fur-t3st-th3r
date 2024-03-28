import { useState } from "react";
import furtherLogo from "./assets/logo.webp";
import { customerRequests } from "./customerRequests";

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
                <th>Customer Location (timezone)</th>
                <th>Sign up date</th>
                <th>Request Source</th>
                <th>Investment Date</th>
                <th>Investment Time</th>
                <th>Refund Request Date</th>
                <th>Refund Request Time</th>
              </tr>
            </thead>
            <tbody className="font-degular font-normal text-lg">
              {customerRequests.map((item, index) => (
                <tr
                  key={index}
                  className="border-top border-b-2 border-black mb-6"
                >
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{"x" ? "✅" : "❌"}</td>
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
