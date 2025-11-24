// 모든 포켓몬의 한글-영어 이름 매핑을 생성하는 스크립트
import * as fs from 'fs';
import * as path from 'path';

interface PokemonName {
  id: number;
  english: string;
  korean: string;
}

const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchAllPokemonNames() {
  console.log("포켓몬 이름 수집 시작...");
  const pokemonNames: PokemonName[] = [];

  // 1025개 포켓몬 수집
  for (let id = 1; id <= 1025; id++) {
    try {
      console.log(`${id}/1025 수집 중...`);

      const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
      if (!response.ok) {
        console.log(`ID ${id} 스킵 (존재하지 않음)`);
        continue;
      }

      const data = await response.json();

      // 영어 이름
      const englishName = data.name;

      // 한글 이름 찾기
      const koreanNameData = data.names.find((n: any) => n.language.name === "ko");
      const koreanName = koreanNameData?.name || englishName;

      pokemonNames.push({
        id,
        english: englishName,
        korean: koreanName,
      });

      // API 호출 제한 방지 (100ms 대기)
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`ID ${id} 처리 중 에러:`, error);
    }
  }

  // JSON 파일로 저장
  const outputPath = path.join(process.cwd(), 'lib', 'data', 'pokemon-names.json');
  const outputDir = path.dirname(outputPath);

  // 디렉토리가 없으면 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(pokemonNames, null, 2), 'utf-8');

  console.log(`\n완료! ${pokemonNames.length}개 포켓몬 저장됨`);
  console.log(`파일 위치: ${outputPath}`);

  // 한글-영어 매핑 객체도 생성
  const koreanToEnglish: { [korean: string]: string } = {};
  pokemonNames.forEach(pokemon => {
    koreanToEnglish[pokemon.korean] = pokemon.english;
  });

  const mappingPath = path.join(process.cwd(), 'lib', 'data', 'pokemon-name-map.json');
  fs.writeFileSync(mappingPath, JSON.stringify(koreanToEnglish, null, 2), 'utf-8');

  console.log(`매핑 파일 저장됨: ${mappingPath}`);
}

fetchAllPokemonNames();
