import { Pokemon, PokemonSpecies } from "./types/pokemon";
import pokemonNameMap from "./data/pokemon-name-map.json";

const BASE_URL = "https://pokeapi.co/api/v2";

// 한글로 포켓몬 이름 찾기 (JSON 파일 사용 - 즉시 반환!)
export function searchPokemonByKoreanName(koreanName: string): string | null {
  return pokemonNameMap[koreanName as keyof typeof pokemonNameMap] || null;
}

// 포켓몬 데이터 가져오기
export async function getPokemonByName(name: string): Promise<Pokemon | null> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return null;
  }
}

// 포켓몬 종 정보 가져오기 (한글 이름 포함)
export async function getPokemonSpecies(
  id: number
): Promise<PokemonSpecies | null> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokemon species:", error);
    return null;
  }
}

// 한글 이름 추출
export function getKoreanName(species: PokemonSpecies): string {
  const koreanName = species.names.find((n) => n.language.name === "ko");
  return koreanName?.name || species.name;
}

// 통합 검색 함수
export async function searchPokemon(query: string): Promise<Pokemon | null> {
  // 영어 이름으로 먼저 시도
  let pokemon = await getPokemonByName(query);

  // 실패하면 한글 이름으로 검색 (JSON에서 즉시 조회!)
  if (!pokemon) {
    const englishName = searchPokemonByKoreanName(query);
    if (englishName) {
      pokemon = await getPokemonByName(englishName);
    }
  }

  return pokemon;
}
