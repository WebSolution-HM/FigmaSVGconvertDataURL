// SVG를 Data URL로 변환하는 Figma 플러그인

let isUIOpen = false;

async function convertSelectedSVG() {
  try {
    // 선택된 노드 확인
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      if (isUIOpen) {
        figma.ui.postMessage({
          type: 'no-selection'
        });
      }
      return;
    }
    
    if (selection.length > 1) {
      if (isUIOpen) {
        figma.ui.postMessage({
          type: 'multiple-selection'
        });
      }
      return;
    }
    
    const selectedNode = selection[0];
    
    // SVG로 내보내기
    let svgString = await selectedNode.exportAsync({
      format: 'SVG_STRING'
    });
    
    console.log('원본 SVG:', svgString);
    
    // SVG 문자열 정리 - 더 강화된 정리 과정
    svgString = svgString
      .trim() // 앞뒤 공백 제거
      .replace(/\r?\n/g, '') // 모든 줄바꿈 문자 제거 (Windows/Mac 호환)
      .replace(/\s+/g, ' ') // 연속된 공백을 하나로 변환
      .replace(/>\s+</g, '><') // 태그 사이 공백 제거
      .replace(/\s+>/g, '>') // 태그 끝 공백 제거
      .replace(/\s+\/>/g, '/>'); // 자체 닫는 태그 앞 공백 제거
    
    console.log('공백 정리 후:', svgString);
    
    // xmlns를 맨 앞으로 이동하고 속성들을 공백 없이 정리
    svgString = svgString.replace(
      /<svg([^>]*?)>/,
      (match, attributes) => {
        // 모든 속성을 파싱
        const attrs = [];
        
        // xmlns 먼저 처리
        const xmlnsMatch = attributes.match(/xmlns=["']([^"']*?)["']/);
        if (xmlnsMatch) {
          attrs.push(`xmlns='${xmlnsMatch[1]}'`);
        } else {
          attrs.push(`xmlns='http://www.w3.org/2000/svg'`);
        }
        
        // 다른 속성들 처리
        const attrMatches = attributes.matchAll(/(\w+)=["']([^"']*?)["']/g);
        for (const match of attrMatches) {
          if (match[1] !== 'xmlns') {
            attrs.push(`${match[1]}='${match[2]}'`);
          }
        }
        
        // 공백으로 구분하여 조합
        return `<svg ${attrs.join(' ')}>`;
      }
    );
    
    console.log('xmlns 정리 후:', svgString);
    
    // 이미 작은따옴표로 처리됨
    console.log('최종 SVG:', svgString);
    
    // Data URL로 변환 (URL 인코딩 방식)
    const encodedSvg = encodeURIComponent(svgString);
    const dataUrl = `data:image/svg+xml,${encodedSvg}`;
    
    console.log('Data URL:', dataUrl);
    
    // UI로 데이터 전송
    if (isUIOpen) {
      figma.ui.postMessage({
        type: 'copy-to-clipboard',
        dataUrl: dataUrl,
        originalSvg: svgString,
        nodeName: selectedNode.name
      });
    }
    
  } catch (error) {
    console.error('SVG 변환 오류:', error);
    if (isUIOpen) {
      figma.ui.postMessage({
        type: 'error',
        message: 'SVG 변환 중 오류가 발생했습니다'
      });
    }
  }
}

async function main() {
  // UI 표시
  figma.showUI(__html__, { 
    width: 400, 
    height: 600,
    themeColors: true 
  });
  
  isUIOpen = true;
  
  // 초기 선택 처리
  await convertSelectedSVG();
  
  // 선택 변경 이벤트 리스너 추가
  figma.on('selectionchange', async () => {
    await convertSelectedSVG();
  });
}

// UI에서 메시지 받기
figma.ui.onmessage = (msg) => {
  if (msg.type === 'close-plugin') {
    isUIOpen = false;
    figma.closePlugin();
  } else if (msg.type === 'convert-current') {
    convertSelectedSVG();
  }
};

main();