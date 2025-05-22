<template>
  <div class="py-10 w-full max-w-xl mx-auto">
    <!-- Profile -->
    <div class="flex items-center gap-x-3">
      <div class="shrink-0">
        <img class="shrink-0 size-64 rounded-full" src="@/assets/images/Donald.jpg" alt="Avatar" />
      </div>

      <div class="grow">
        <h1 class="text-lg font-medium text-gray-800 dark:text-neutral-200">Donald Edwin Bosco</h1>
        <p class="text-sm text-gray-600 dark:text-neutral-400">
          Founder & CEO, Full Stack Developer
        </p>
      </div>
    </div>
    <!-- End Profile -->

    <!-- About -->
    <div class="mt-8">
      <p class="text-sm text-gray-600 dark:text-neutral-400">
        I am an enthusiastic full-stack developer and entrepreneur, driven by a passion for
        leveraging technology to solve real-world problems. With expertise in both front-end and
        back-end development, I enjoy building intuitive user interfaces and robust server-side 
        applications. I thrive on the challenge of creating innovative solutions that enhance user
        experiences and streamline business operations. My entrepreneurial spirit pushes me to
        explore new ideas and start projects that can make a meaningful impact, inspiring others to
        embrace the power of technology in their own ventures.
      </p>

      <ul class="mt-5 flex flex-col gap-y-3">
        <li class="flex items-center gap-x-2.5">
          <svg
            class="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <a
            class="text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
            href="#"
          >
            donaldedu172@gmail.com
          </a>
        </li>

        <li class="flex items-center gap-x-2.5">
          <svg
            class="shrink-0 size-3.5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1881 10.1624L22.7504 0H20.7214L13.2868 8.82385L7.34878 0H0.5L9.47944 13.3432L0.5 24H2.5291L10.3802 14.6817L16.6512 24H23.5L14.1881 10.1624ZM11.409 13.4608L3.26021 1.55962H6.37679L20.7224 22.5113H17.6058L11.409 13.4613V13.4608Z"
              fill="currentColor"
            />
          </svg>
          <a
            class="text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
            href="#"
          >
            donald_.edwin
          </a>
        </li>
      </ul>
    </div>
    <!-- End About -->
  </div>
</template>

<script>
export default {}
</script>

<style></style>
