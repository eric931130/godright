"use client";

import { CharacterImageSwitcher } from "@/components/characters/character-image-switcher";
import { EditableImage } from "@/components/dev/editable-image";
import { useDevMode } from "@/components/dev/dev-mode-provider";

type CharacterPortraitEditableProps = {
  contentKey: string;
  /** 顯示用立繪（覆蓋值或預設）。 */
  portraitUrl: string;
  /** 目前的覆蓋 URL（無則 undefined，供編輯框初始值）。 */
  overrideValue?: string;
  chibiUrl: string;
  defaultMode: "portrait" | "chibi";
  name: string;
};

/**
 * 開發者開編輯模式時，立繪改為可編輯（貼 URL 存檔）；否則維持原本的 Q版/立繪切換器。
 */
export function CharacterPortraitEditable({
  contentKey,
  portraitUrl,
  overrideValue,
  chibiUrl,
  defaultMode,
  name,
}: CharacterPortraitEditableProps) {
  const { isDeveloper, editing } = useDevMode();

  if (isDeveloper && editing) {
    return (
      <EditableImage
        contentKey={contentKey}
        value={overrideValue}
        className="aspect-[3/4]"
        alt={`${name} 立繪`}
      />
    );
  }

  return (
    <CharacterImageSwitcher
      chibiUrl={chibiUrl}
      defaultMode={defaultMode}
      name={name}
      portraitUrl={portraitUrl}
    />
  );
}
