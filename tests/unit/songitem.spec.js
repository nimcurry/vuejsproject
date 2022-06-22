import {mount, RouterLinkStub} from '@vue/test-utils';
import SongItem from '@/components/SongItems.vue';

describe('SongItems.vue', () => {
  test('render song.display_name', () => {
    const song = { display_name: 'test' };
    const wrapper = mount(SongItem, {
      propsData: { song },
      global: { components: { 'router-link': RouterLinkStub } },
    });
    const CompositionAuthor = wrapper.find('.text-gray-500');
    expect(CompositionAuthor.text()).toBe(song.display_name);
  });

  test('render song.docID  in id attribute', () => {
    const song = { docID: 'abc' };
    const wrapper = mount(SongItem, {
      propsData: { song },
      global: { components: { 'router-link': RouterLinkStub } },
    });
    // expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`);
    expect(wrapper.classes()).toContain(`song-id-${song.docID}`);
  });
});
