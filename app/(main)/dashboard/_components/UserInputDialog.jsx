"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react"; // For the spinning animation

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,

} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const images = [
  {
    src: "https://ai-coaching-voice-agent.vercel.app/_next/image?url=%2Ft1.avif&w=256&q=75",
    name: "Joanna",
  },
  {
    src: "https://ai-coaching-voice-agent.vercel.app/_next/image?url=%2Ft2.jpg&w=256&q=75",
    name: "Salli",
  },
  {
    src: "https://ai-coaching-voice-agent.vercel.app/_next/image?url=%2Ft3.jpg&w=256&q=75",
    name: "Joey",
  },
];

const UserInputDialog = ({ children, title }) => {
  const [active, setActive] = useState(null);
  const [userText, setuserText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulating a process
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <div>
            <div as children>
              <h1 className="text-black">
                Enter a topic to master your skills in {title}
              </h1>
              <Textarea
                onChange={(e) => setuserText(e.target.value)}
                className="mt-3"
              />
              <h1 className="text-black mt-5">Select your coaching expert</h1>
              <div className="w-full flex  gap-3 mt-3">
                {images.map((img, index) => (
                  <div key={index} className="text-center">
                    <div className="p-[4px]">
                      <img
                        className={`w-20 h-20 object-cover rounded-xl transition-transform duration-200 cursor-pointer ${
                          active === index
                            ? "border-2 border-blue-500"
                            : "border-2 border-transparent"
                        } hover:scale-105`}
                        src={img.src}
                        alt={img.name}
                        onClick={() => setActive(index)}
                      />
                    </div>
                    <p>{img.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex items-center justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={!userText || !active || loading}
                className="bg-blue-600 flex items-center"
                onClick={handleClick}
              >
                {loading ? (
                  <div className="flex items-center gap-1">
                    <Loader2 className="animate-spin " size={20} /> Start{" "}
                  </div>
                ) : (
                  "Start"
                )}
              </Button>{" "}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserInputDialog;
