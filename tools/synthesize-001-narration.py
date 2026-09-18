import json
import re
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

import kokoro.pipeline as kokoro_pipeline
from kokoro import KPipeline


ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "content" / "001-keyboard-layout" / "script.md"
OUTPUT_DIR = ROOT / "exports" / "001-keyboard-layout" / "narration-v1"
MANIFEST = OUTPUT_DIR / "manifest.json"

SECTIONS = [
    ("Hook", 0, 35),
    ("กติกาในการดู Keyboard Layout", 35, 40),
    ("Full-size หรือ 100%", 75, 50),
    ("96%, 98% และ 1800 Compact", 125, 55),
    ("TKL หรือ 80%", 180, 55),
    ("75%", 235, 60),
    ("65%", 295, 65),
    ("60% และความหมายของ Layer", 360, 65),
    ("เลือก Layout จาก Workflow", 425, 100),
    ("สรุป", 525, 30),
]

RECORDING_EDITS = {
    "Hook": """
คีย์บอร์ดสองตัวนี้เขียนว่าเก้าสิบแปดเปอร์เซ็นต์เหมือนกัน แต่ตัวหนึ่งมีเก้าสิบเจ็ดปุ่ม อีกตัวมีเก้าสิบเก้าปุ่ม

เพราะเปอร์เซ็นต์เป็นชื่อเรียกขนาดโดยประมาณ ไม่ใช่มาตรฐานตายตัว ก่อนซื้อจึงไม่ควรถามว่ากี่เปอร์เซ็นต์ดีที่สุด แต่ควรถามว่าปุ่มไหนที่เราใช้จริง และถ้าปุ่มนั้นหายไป เรายอมกดเอฟเอ็นแทนได้ไหม

คลิปนี้เราจะเริ่มจากฟูลไซซ์ แล้วค่อย ๆ ดูว่าเมื่อคีย์บอร์ดเล็กลง ปุ่มอะไรถูกตัด ถูกบีบ หรือเพียงถูกย้ายไปอยู่บนเลเยอร์
""",
    "กติกาในการดู Keyboard Layout": """
ก่อนเทียบแต่ละขนาด ให้แบ่งคีย์บอร์ดเป็นห้ากลุ่ม กลุ่มพิมพ์หลัก แถวเอฟ ปุ่มนำทาง ลูกศร และนัมแพด

เวลาคีย์บอร์ดเล็กลง กลุ่มพิมพ์หลักมักยังอยู่ครบ สิ่งที่เปลี่ยนคืออีกสี่กลุ่ม ว่าจะยังเป็นปุ่มเฉพาะ ถูกย้ายตำแหน่ง หรือซ่อนไว้หลังเอฟเอ็น

เพราะฉะนั้นให้ดูรูปแบบปุ่มจริงของรุ่นที่สนใจ แทนการจำแค่จำนวนปุ่มหรือชื่อเปอร์เซ็นต์
""",
    "สรุป": """
สรุปสั้น ๆ ถ้าใช้นัมแพดบ่อย ดูฟูลไซซ์หรือกลุ่มเก้าสิบหกถึงเก้าสิบแปดเปอร์เซ็นต์ ถ้าไม่ใช้นัมแพดแต่อยากได้ปุ่มคุ้นมือ ดูทีเคแอล

ถ้าอยากเล็กลงแต่ยังใช้แถวเอฟ ดูเจ็ดสิบห้าเปอร์เซ็นต์ ถ้าต้องการลูกศรและยอมกดเอฟเอ็น ดูหกสิบห้าเปอร์เซ็นต์ และถ้าขนาดสำคัญที่สุด พร้อมเรียนรู้เลเยอร์ ดูหกสิบเปอร์เซ็นต์

สุดท้ายต้องเปิดรูปปุ่มจริงและคีย์แมปของรุ่นนั้นเสมอ แล้วลองแชร์กันว่าเราใช้เลย์เอาต์อะไร และมีปุ่มไหนที่ขาดไม่ได้
""",
}

SPOKEN_REPLACEMENTS = [
    (r"mechanical keyboard", "คีย์บอร์ดแมคคานิคอล"),
    (r"physical layout", "รูปแบบปุ่มจริง"),
    (r"navigation cluster", "กลุ่มปุ่มนำทาง"),
    (r"navigation keys", "ปุ่มนำทาง"),
    (r"key combinations", "การกดปุ่มร่วมกัน"),
    (r"dedicated key", "ปุ่มเฉพาะ"),
    (r"learning curve", "ช่วงเรียนรู้"),
    (r"muscle memory", "ความจำของกล้ามเนื้อ"),
    (r"full-size", "ฟูลไซซ์"),
    (r"Full-size", "ฟูลไซซ์"),
    (r"F-row", "แถวเอฟ"),
    (r"numpad", "นัมแพด"),
    (r"layout", "เลย์เอาต์"),
    (r"Layout", "เลย์เอาต์"),
    (r"layer", "เลเยอร์"),
    (r"Layer", "เลเยอร์"),
    (r"workflow", "เวิร์กโฟลว์"),
    (r"spreadsheet", "สเปรดชีต"),
    (r"accounting", "งานบัญชี"),
    (r"shortcut", "ชอร์ตคัต"),
    (r"baseline", "จุดตั้งต้น"),
    (r"friction", "ความติดขัด"),
    (r"keymap", "คีย์แมป"),
    (r"Firmware", "เฟิร์มแวร์"),
    (r"laptop", "แล็ปท็อป"),
    (r"toggle", "สลับเปิดปิด"),
    (r"multimedia", "มัลติมีเดีย"),
    (r"IDE", "ไอดีอี"),
    (r"QMK", "คิวเอ็มเค"),
    (r"TKL", "ทีเคแอล"),
    (r"Tenkeyless", "เท็นคีย์เลส"),
    (r"Fn", "เอฟเอ็น"),
    (r"arrows", "ลูกศร"),
    (r"navigation", "ปุ่มนำทาง"),
    (r"Delete", "ดีลีต"),
    (r"Insert", "อินเสิร์ต"),
    (r"Home", "โฮม"),
    (r"End", "เอ็นด์"),
    (r"Page Up", "เพจอัป"),
    (r"Page Down", "เพจดาวน์"),
]


def extract_sections(markdown: str) -> dict[str, str]:
    narration = markdown.split("## Narration", 1)[1].split("## Owner review", 1)[0]
    chunks = re.split(r"^###\s+", narration, flags=re.MULTILINE)[1:]
    result = {}
    for chunk in chunks:
        title, body = chunk.split("\n", 1)
        result[title.strip()] = body.strip()
    return result


def make_spoken_parts(text: str) -> list[str]:
    text = re.sub(r"\s*`?\(C-[^)]+\)`?", "", text)
    text = text.replace("`", "").replace("—", " ")
    paragraphs = re.split(r"\r?\n\s*\r?\n", text)
    text = "\n".join(re.sub(r"\s+", " ", paragraph).strip() for paragraph in paragraphs)
    for source, target in SPOKEN_REPLACEMENTS:
        text = re.sub(rf"\b{source}\b", target, text, flags=re.IGNORECASE if source[0].islower() else 0)
    return [part.strip() for part in text.splitlines() if part.strip()]


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    voice = sys.argv[1] if len(sys.argv) > 1 else "am_fenrir"
    sections = extract_sections(SCRIPT.read_text(encoding="utf-8"))
    missing = [title for title, _, _ in SECTIONS if title not in sections]
    if missing:
        raise RuntimeError(f"Missing narration sections: {missing}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    kokoro_pipeline.LANG_CODES["th"] = "th"
    pipeline = KPipeline(lang_code="th", repo_id="hexgrad/Kokoro-82M", device="cpu")
    manifest = {"voice": voice, "sampleRate": 24000, "segments": []}

    for index, (title, start, slot_duration) in enumerate(SECTIONS, start=1):
        spoken_parts = make_spoken_parts(RECORDING_EDITS.get(title, sections[title]))
        generated = []
        pause = np.zeros(int(24000 * 0.18), dtype=np.float32)
        for part_index, part in enumerate(spoken_parts):
            generated.extend(item.audio for item in pipeline(part, voice=voice, speed=1.0))
            if part_index < len(spoken_parts) - 1:
                generated.append(pause)
        if not generated:
            raise RuntimeError(f"No audio generated for {title}")
        audio = np.concatenate(generated)
        output = OUTPUT_DIR / f"segment-{index:02d}.wav"
        sf.write(output, audio, 24000)
        duration = len(audio) / 24000
        manifest["segments"].append({
            "index": index,
            "title": title,
            "start": start,
            "slotDuration": slot_duration,
            "audioDuration": round(duration, 3),
            "file": output.name,
            "spokenText": "\n".join(spoken_parts),
        })
        print(f"{index:02d}/10 {title}: {duration:.1f}s in {slot_duration}s slot")

    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {MANIFEST}")


if __name__ == "__main__":
    main()
