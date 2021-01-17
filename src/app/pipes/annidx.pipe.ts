import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'annidx'
})
export class AnnotateIndexPipe implements PipeTransform {
  private getStyle(confidence: number): string {
    return `background-color: rgba(255, 255, 49, ${confidence})`;
  }

  transform(value: string, pos: string[], cssClass: string): string {
    const offsets = !pos ? [] : pos.map(pos => <number[]>JSON.parse(pos));
    let result = "";
    let p = 0;

    for (let i = 0; i < offsets.length; i++) {
      const [start, end, confidence] = offsets[i];
      const before = value.substring(0, start - p);
      const sentence = value.substring(start - p, end - p + 1);

      const span = `${before}<span class="${cssClass}" style="${this.getStyle(confidence)}">${sentence}</span>`;

      result += span;
      value = value.substring(end - p + 1);
      p = end + 1;
    }

    return result + value;
  }
}
