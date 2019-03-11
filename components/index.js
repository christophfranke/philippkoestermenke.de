export default {
	RichText: () => import('./RichText.vue'),
	Menu: () => import('./Menu.vue'),
	Breadcrump: () => import('./Breadcrump.vue'),
	Logo: () => import('./Logo.vue'),
	Gallery: () => import('./Gallery.vue'),
	ResponsiveSlideImage: () => import('./ResponsiveSlideImage.vue'),
	ResponsiveGalleryImage: () => import('./ResponsiveGalleryImage.vue'),
	Carousel: () => import('vue-carousel').then(module => module.Carousel),
	Slide: () => import('vue-carousel').then(module => module.Slide)
}
