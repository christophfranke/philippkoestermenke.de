export default {
	RichText: () => import('./RichText.vue'),
	Menu: () => import('./Menu.vue'),
	Breadcrump: () => import('./Breadcrump.vue'),
	Logo: () => import('./Logo.vue'),
	Gallery: () => import('./Gallery.vue'),
	ResponsiveImage: () => import('./ResponsiveImage.vue'),
	Carousel: () => import('vue-carousel').then(module => module.Carousel),
	Slide: () => import('vue-carousel').then(module => module.Slide)
}
