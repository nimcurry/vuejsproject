import { shallowMount } from '@vue/test-utils';
import About from '@/views/About.vue';

describe('About.vue', () => {
  test('renders inner text', () => {
    // eslint-disable-next-line no-bitwise
    const wrapper = shallowMount(About);

    expect(wrapper.text()).toContain('about');
  });
});
