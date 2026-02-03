import { useEffect, useMemo, useRef, useState } from "react";
import { Card, Button, Slider, Space, Typography } from "antd";
import { Canvas, PencilBrush, FabricImage } from "fabric";

type Props = {
  file: File | null;
  width?: number;
  height?: number;
  className?: string;
};

export default function FabricImageAnnotator({
  file,
  width = 834,
  height = 460,
  className,
}: Props) {
  const { Text } = Typography;

  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  const [drawing, setDrawing] = useState(true);
  const [brushSize, setBrushSize] = useState(8);

  const isImage = useMemo(() => {
    if (!file) return false;
    return (
      file.type?.startsWith("image/") ||
      /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(file.name)
    );
  }, [file]);

  const objectUrl = useMemo(() => {
    if (!file || !isImage) return null;
    return URL.createObjectURL(file);
  }, [file, isImage]);

  // revoke URL
  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  // init canvas once
  useEffect(() => {
    if (!canvasElRef.current) return;

    const c = new Canvas(canvasElRef.current, {
      width,
      height,
      selection: false,
      preserveObjectStacking: true,
    });

    c.isDrawingMode = true;
    c.freeDrawingBrush = new PencilBrush(c);
    c.freeDrawingBrush.width = brushSize;

    fabricCanvasRef.current = c;

    return () => {
      c.dispose();
      fabricCanvasRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep canvas sized
  useEffect(() => {
    const c = fabricCanvasRef.current;
    if (!c) return;

    c.setDimensions({ width, height }, { cssOnly: false });
    c.requestRenderAll();
  }, [width, height]);

  // update drawing mode & brush
  useEffect(() => {
    const c = fabricCanvasRef.current;
    if (!c) return;

    c.isDrawingMode = drawing;
    if (c.freeDrawingBrush) c.freeDrawingBrush.width = brushSize;
  }, [drawing, brushSize]);

  // load background image
  useEffect(() => {
    const c = fabricCanvasRef.current;
    if (!c) return;

    // remove all drawn objects but keep canvas instance
    c.getObjects().forEach((obj) => c.remove(obj));
    c.backgroundImage = undefined;

    // keep brush settings alive
    c.isDrawingMode = drawing;
    c.freeDrawingBrush = new PencilBrush(c);
    c.freeDrawingBrush.width = brushSize;

    if (!objectUrl) {
      c.requestRenderAll();
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const img = await FabricImage.fromURL(objectUrl); // Promise-based in v6 :contentReference[oaicite:4]{index=4}
        if (cancelled) return;

        // fit image into canvas
        const scale = Math.min(width / (img.width ?? 1), height / (img.height ?? 1));
        img.scale(scale);

        img.set({
          left: (width - img.getScaledWidth()) / 2,
          top: (height - img.getScaledHeight()) / 2,
          selectable: false,
          evented: false,
        });

        // v6: assign backgroundImage directly (no setBackgroundImage) :contentReference[oaicite:5]{index=5}
        c.backgroundImage = img;
        c.requestRenderAll();
      } catch (e) {
        // optional: surface to UI
        console.error("Failed to load image into Fabric:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [objectUrl, width, height, drawing, brushSize]);

  const clearDrawings = () => {
    const c = fabricCanvasRef.current;
    if (!c) return;

    c.getObjects().forEach((obj) => c.remove(obj));
    c.requestRenderAll();
  };

  const exportPng = () => {
    const c = fabricCanvasRef.current;
    if (!c) return;

    const dataUrl = c.toDataURL({ format: "png", multiplier: 1 });
    window.open(dataUrl, "_blank");
  };

  if (!file) return null;

  return (
    <Card className={className} style={{ width, borderRadius: 16 }}>
      <Space direction="vertical" style={{ width: "100%" }} size={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
          }}
        >
          <Text strong>{file.name}</Text>

          <Space>
            <Button onClick={() => setDrawing((v) => !v)}>
              {drawing ? "Drawing: ON" : "Drawing: OFF"}
            </Button>
            <Button onClick={clearDrawings}>Clear Drawings</Button>
            <Button type="primary" onClick={exportPng}>
              Export PNG
            </Button>
          </Space>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Text style={{ minWidth: 80 }}>Brush</Text>
          <Slider
            style={{ flex: 1 }}
            min={1}
            max={40}
            value={brushSize}
            onChange={(v) => setBrushSize(v)}
          />
          <Text style={{ width: 40, textAlign: "right" }}>{brushSize}</Text>
        </div>

        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            background: "#f5f5f5",
            border: "1px solid #eee",
          }}
        >
          <canvas ref={canvasElRef} />
        </div>

        {!isImage && (
          <Text type="secondary">
            This file doesn’t look like an image. Upload PNG/JPG/JPEG to annotate.
          </Text>
        )}
      </Space>
    </Card>
  );
}
