import { Request, Response } from "express";
import { createHash } from "crypto";

function writeResponse(err: any, data: any, res: Response) {
  if (err) {
    res.status(err.code && Number.isInteger(err.code) ? err.code : 500);
    return res.json({
      status: "error",
      message: err.message,
    });
  }
  res.status(200);
  const response = {
    status: "Success",
    data: data,
  };
  return res.json(response);
}

function invoker(promise: any) {
  return promise
    .then((data) => {
      return [data, null];
    })
    .catch((err) => {
      return [null, err];
    });
}

// generate hash using given values
function generateHash(transaction: any, prevHash: string) {
  const nonce = Math.round(Math.random() * 999999999);
  const combinedData = JSON.stringify({ nonce, transaction, prevHash });
  const hash = createHash("sha256").update(combinedData).digest("hex");
  return hash;
}

export { writeResponse, invoker, generateHash };
