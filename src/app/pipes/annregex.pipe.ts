import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'annregex'
})
export class AnnotateRegexPipe implements PipeTransform {
  transform(value: string, names: string[], cssClass: string): string {
    return !names ? value : names
      .map(name => name.split("|")[0])    // extract named entity
      .map(ntt => ntt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))   // escape special regexp-characters
      .sort()
      .filter((el, idx, arr) => arr.indexOf(el) == idx)   // only keep first occurrence of entity (removes duplicates)
      .map(name => new RegExp(name, "gi"))    // create regexp to match entity in text
      .reduce((acc: string, regexp: RegExp) => acc.replace(regexp, `<span class=${cssClass}>$&</span>`), value || "");  // insert span-elements for highlighting
  }
}
