"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@components/ui/input-otp";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { sendEmailOTP, verifySecret } from "@lib/actions/users.actions";
import { useRouter } from "next/navigation";

interface OTPModalProps {
  accountId: string;
  email: string;
}

const OTPModal = ({ accountId, email }: OTPModalProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call API to verify OTP
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) {
        router.push("/");
      }
    } catch (e) {
      console.log("Failed to verify OTP", e);
    }

    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    // Call API to resend OTP
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className={"shad-alert-dialog"}>
        <AlertDialogHeader className={"relative flex justify-center"}>
          <AlertDialogTitle className={"h2 text-center"}>
            Enter Your OTP
            <Image
              src={"/assets/icons/close-dark.svg"}
              alt={"close"}
              width={20}
              height={20}
              className={"otp-close-button"}
              onClick={() => setIsOpen(false)}
            />
          </AlertDialogTitle>
          <AlertDialogDescription
            className={"subtitle-2 text-center text-light-100"}
          >
            We&apos;ve sent a code to{" "}
            <span className={"pl-1 text-brand"}>{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className={"shad-otp"}>
            <InputOTPSlot index={0} className={"shad-otp-slot"} />
            <InputOTPSlot index={1} className={"shad-otp-slot"} />
            <InputOTPSlot index={2} className={"shad-otp-slot"} />
            <InputOTPSlot index={3} className={"shad-otp-slot"} />
            <InputOTPSlot index={4} className={"shad-otp-slot"} />
            <InputOTPSlot index={5} className={"shad-otp-slot"} />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className={"flex w-full flex-col gap-4"}>
            <AlertDialogAction
              className={"shad-submit-btn h-12"}
              type={"button"}
              onClick={handleSubmit}
            >
              Submit
              {isLoading && (
                <Image
                  src={"/assets/icons/loader.svg"}
                  alt={"loader"}
                  width={24}
                  height={24}
                  className={"ml-2 animate-spin"}
                />
              )}
            </AlertDialogAction>
            <div className={"subtitle-2 mt-2 text-center text-light-100"}>
              Didn&apos;t receive the code?
              <Button
                type={"button"}
                variant={"link"}
                className={"pl-1 text-brand"}
                onClick={handleResendOTP}
              >
                Click to resend
              </Button>
            </div>
          </div>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;