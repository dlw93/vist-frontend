import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'annotate'
})
export class AnnotatePipe implements PipeTransform {
  transform(value: string, names: string[], cssClass: string): string {
    return names
      .map(name => name.split("|")[0])
      .sort()
      .filter((el, idx, arr) => arr.indexOf(el) == idx)
      .map(name => new RegExp(name, "gi"))
      .reduce((acc: string, regexp: RegExp) => acc.replace(regexp, `<span class=${cssClass}>$&</span>`), value);
  }
}
