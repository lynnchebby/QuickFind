<template>
  <!-- ========== HEADER ========== -->
  <header
    class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
  >
    <nav
      class="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8"
    >
      <div class="flex justify-between items-center gap-x-1">
        <a
          @click="goToHome"
          class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
          href="#"
          aria-label="Brand"
          >Eco system</a
        >

        <!-- Collapse Button -->
        <button
          type="button"
          class="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          id="hs-header-base-collapse"
          aria-expanded="false"
          aria-controls="hs-header-base"
          aria-label="Toggle navigation"
          data-hs-collapse="#hs-header-base"
        >
          <svg
            class="hs-collapse-open:hidden size-4"
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
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
          <svg
            class="hs-collapse-open:block shrink-0 hidden size-4"
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span class="sr-only">Toggle navigation</span>
        </button>
        <!-- End Collapse Button -->
      </div>

      <!-- Collapse -->
      <div
        id="hs-header-base"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
        aria-labelledby="hs-header-base-collapse"
      >
        <div
          class="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <div class="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
            <div class="grow">
              <div
                class="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1"
              >
                <!-- Mega Menu -->
                <div
                  class="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] [--is-collapse:true] md:[--is-collapse:false]"
                >
                  <button
                    id="hs-header-base-mega-menu-small"
                    type="button"
                    class="hs-dropdown-toggle w-full p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Mega Menu"
                  >
                    <svg
                      class="shrink-0 size-4 me-3 md:me-2 block md:hidden"
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
                      <path
                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Resources
                    <svg
                      class="hs-dropdown-open:-rotate-180 md:hs-dropdown-open:rotate-0 duration-300 shrink-0 size-4 ms-auto md:ms-1"
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative md:w-80 hidden z-10 top-full md:bg-white md:rounded-lg md:shadow-md before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:md:bg-neutral-800"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-header-base-mega-menu-small"
                  >
                    <div class="py-1 md:px-1 space-y-0.5">
                      <!-- Link -->
                      <a
                        class="p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <svg
                          class="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200"
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
                          <line x1="22" x2="2" y1="12" y2="12" />
                          <path
                            d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                          />
                          <line x1="6" x2="6.01" y1="16" y2="16" />
                          <line x1="10" x2="10.01" y1="16" y2="16" />
                        </svg>
                        <div class="grow">
                          <span
                            class="block font-semibold text-sm text-gray-800 dark:text-neutral-200"
                            >Data</span
                          >
                          <p class="text-sm text-gray-500 dark:text-neutral-500">
                            How you get the most accurate and up-to-date data
                          </p>
                        </div>
                      </a>
                      <!-- End Link -->

                      <div class="my-2 border-t border-gray-100 dark:border-neutral-800"></div>

                      <!-- Link -->
                      <a
                        @click="goToTeam"
                        class="p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <svg
                          class="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200"
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
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <div class="grow">
                          <span
                            class="block font-semibold text-sm text-gray-800 dark:text-neutral-200"
                            >Team
                            <span
                              class="inline ms-1 font-medium text-xs bg-blue-600 text-white py-1 px-2 rounded-full"
                              >We're hiring</span
                            ></span
                          >
                          <p class="text-sm text-gray-500 dark:text-neutral-500">
                            Meet the people building products to help your business grow
                          </p>
                        </div>
                      </a>
                      <!-- End Link -->

                      <div class="my-2 border-t border-gray-100 dark:border-neutral-800"></div>

                      <!-- Link -->
                      <a
                        class="p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <svg
                          class="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200"
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
                          <path
                            d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
                          />
                          <path d="M18 14h-8" />
                          <path d="M15 18h-5" />
                          <path d="M10 6h8v4h-8V6Z" />
                        </svg>
                        <div class="grow">
                          <span
                            class="block font-semibold text-sm text-gray-800 dark:text-neutral-200"
                            >Blog</span
                          >
                          <p class="text-sm text-gray-500 dark:text-neutral-500">
                            The latest news, feature releases, and how to grow with data
                          </p>
                        </div>
                      </a>
                      <!-- End Link -->
                    </div>
                  </div>
                </div>
                <!-- End Mega Menu -->

                <a
                  class="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="#"
                >
                  <svg
                    class="shrink-0 size-4 me-3 md:me-2 block md:hidden"
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
                    <path
                      d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
                    />
                    <path d="M18 14h-8" />
                    <path d="M15 18h-5" />
                    <path d="M10 6h8v4h-8V6Z" />
                  </svg>
                  Contact
                </a>
              </div>
            </div>

            <div class="my-2 md:my-0 md:mx-2">
              <div
                class="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300 dark:bg-neutral-700"
              ></div>
            </div>

            <!-- Button Group -->
            <div class="flex flex-wrap items-center gap-x-1.5">
              <a
                @click="goToLogin"
                class="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                href="#"
              >
                Sign in
              </a>
              <a
                @click="goToRegister"
                class="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-600"
                href="#"
              >
                Get started
              </a>
            </div>
            <!-- End Button Group -->
          </div>
        </div>
      </div>
      <!-- End Collapse -->
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// go to registration
function goToRegister() {
  router.push('/register')
}
// go to registration
function goToLogin() {
  router.push('/login')
}
// go to home
function goToHome() {
  router.push('/')
}
// go to team
function goToTeam() {
  router.push('/team')
}
</script>

<style></style>
