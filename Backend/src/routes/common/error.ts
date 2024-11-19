/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleError = (res?: any, error?: any) => {
  console.error(error);
  if (error instanceof Error) {
    res.json({ message: error.message });
  } else {
    res.json({ message: "An unknown error occurred" });
  }
};
