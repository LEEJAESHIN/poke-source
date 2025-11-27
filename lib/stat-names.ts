// 능력치 이름을 한글로 변환
export function getKoreanStatName(statName: string): string {
  const statNameMap: { [key: string]: string } = {
    hp: "HP",
    attack: "공격",
    defense: "방어",
    "special-attack": "특수공격",
    "special-defense": "특수방어",
    speed: "스피드",
  };

  return statNameMap[statName] || statName;
}
