import { VistBoxModule } from './vist-box.module';

describe('VistBoxModule', () => {
  let vistBoxModule: VistBoxModule;

  beforeEach(() => {
    vistBoxModule = new VistBoxModule();
  });

  it('should create an instance', () => {
    expect(vistBoxModule).toBeTruthy();
  });
});
