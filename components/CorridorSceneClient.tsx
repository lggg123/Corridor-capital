"use client";

import dynamic from "next/dynamic";

const CorridorScene = dynamic(() => import("./CorridorScene"), {
  ssr: false,
  loading: () => null,
});

export default function CorridorSceneClient() {
  return <CorridorScene />;
}
