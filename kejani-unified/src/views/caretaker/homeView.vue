<template>
  <!-- Features -->
  <div class="overflow-hidden">
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <!-- Title -->

      <div class="mx-auto max-w-2xl mb-8 lg:mb-14 text-center">
        <h1 class="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-neutral-200">QuickFind</h1>
        <h2
          v-if="user && user.displayName"
          class="text-3xl lg:text-4xl text-gray-800 font-bold dark:text-neutral-200"
        >
          More than one Apartment? We’ve got you covered {{ user.displayName }}
        </h2>
      </div>
      <!-- End Title -->

      <div class="relative xl:w-10/12 xl:mx-auto">
        <!-- Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div v-for="hostel in caretakerStore.hostels" :key="hostel.id">
            <!-- Loading indicator -->

            <!-- Card -->
            <div
              class="p-4 relative z-10 bg-white border rounded-xl md:p-10 dark:bg-neutral-900 dark:border-neutral-800"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-full-screen-modal"
              data-hs-overlay="#hs-full-screen-modal"
            >
              <h3 class="text-xl font-bold text-gray-800 dark:text-neutral-200">
                {{ hostel.name }}
              </h3>
              <div class="text-sm text-gray-500 dark:text-neutral-500">
                Everything a small team needs.
              </div>

              <div class="mt-5">
                <span class="text-6xl font-bold text-gray-800 dark:text-neutral-200">{{
                  hostel.price
                }}</span>

                <span class="ms-3 text-gray-500 dark:text-neutral-500">ksh / monthly</span>
              </div>

              <div
                class="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0"
              >
                <!-- List -->
                <ul class="space-y-2 text-sm sm:text-base">
                  <li class="flex gap-x-3">
                    <span
                      class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500"
                    >
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
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span class="text-gray-800 dark:text-neutral-200">
                      ksh {{ hostel.deposit }} deposit
                    </span>
                  </li>

                  <li class="flex gap-x-3">
                    <span
                      class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500"
                    >
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
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span class="text-gray-800 dark:text-neutral-200">
                      {{ hostel.locationId }}
                    </span>
                  </li>
                </ul>
                <!-- End List -->

                <!-- List -->
                <ul class="space-y-2 text-sm sm:text-base">
                  <li class="flex gap-x-3">
                    <span
                      class="size-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500"
                    >
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
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </span>
                    <span class="text-gray-800 dark:text-neutral-200"> self contained </span>
                  </li>

                  <li class="flex gap-x-3">
                    <span
                      class="size-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500"
                    >
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
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </span>
                    <span class="text-gray-800 dark:text-neutral-200"> Product support </span>
                  </li>

                  <li class="flex gap-x-3">
                    <span
                      class="size-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500"
                    >
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
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </span>
                    <span class="text-gray-800 dark:text-neutral-200"> Activity reporting </span>
                  </li>
                </ul>
                <!-- End List -->
              </div>

              <div class="mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">Cancel anytime.</p>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">No card required.</p>
                </div>

                <div class="flex justify-end">
                  <button
                    type="button"
                    class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    View more
                  </button>
                </div>
              </div>
              <!-- End Card -->

              <!-- Message when no hostels are found -->
              <div v-if="!caretakerStore.loading && caretakerStore.hostels.length === 0">
                No hostels found.
              </div>

              <!-- modal  -->
              <div
                id="hs-full-screen-modal"
                class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                role="dialog"
                tabindex="-1"
                aria-labelledby="hs-full-screen-label"
              >
                <div
                  class="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full max-h-full h-full"
                >
                  <div
                    class="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full dark:bg-neutral-800"
                  >
                    <div
                      class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700"
                    >
                      <h3 id="hs-full-screen-label" class="font-bold text-gray-800 dark:text-white">
                        Noble Breeze
                      </h3>
                      <button
                        type="button"
                        class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                        aria-label="Close"
                        data-hs-overlay="#hs-full-screen-modal"
                      >
                        <span class="sr-only">Close</span>
                        <svg
                          class="shrink-0 size-4"
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
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                    </div>
                    <!-- Card Section -->
                    <div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
                      <!-- Card -->
                      <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
                        <div class="mb-8">
                          <h2 class="text-xl font-bold text-gray-800 dark:text-neutral-200">
                            Profile
                          </h2>
                          <p class="text-sm text-gray-600 dark:text-neutral-400">
                            Manage your Apartments.
                          </p>
                        </div>

                        <form>
                          <!-- Grid -->
                          <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
                            <div class="sm:col-span-3">
                              <label
                                class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                              >
                                Profile photo
                              </label>
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-9">
                              <div class="flex items-center gap-5">
                                <img
                                  class="inline-block size-16 rounded-full ring-2 ring-white dark:ring-neutral-900"
                                  src="https://preline.co/assets/img/160x160/img1.jpg"
                                  alt="Avatar"
                                />
                                <div class="flex gap-x-2">
                                  <div>
                                    <button
                                      type="button"
                                      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                    >
                                      <svg
                                        class="shrink-0 size-4"
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
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" x2="12" y1="3" y2="15" />
                                      </svg>
                                      Upload photo
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-3">
                              <label
                                for="af-account-full-name"
                                class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                              >
                                Apartment Name
                              </label>
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-9">
                              <div class="sm:flex">
                                <input
                                  id="af-account-full-name"
                                  type="text"
                                  class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                  placeholder="Maria"
                                />
                                <input
                                  type="text"
                                  class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                  placeholder="Boone"
                                />
                              </div>
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-3">
                              <label
                                for="af-account-email"
                                class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                              >
                                Caretaker's Name
                              </label>
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-9">
                              <input
                                id="af-account-email"
                                type="email"
                                class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                placeholder="John Doe"
                              />
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-3">
                              <label
                                for="af-account-password"
                                class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                              >
                                Password
                              </label>
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-9">
                              <div class="space-y-2">
                                <input
                                  id="af-account-password"
                                  type="text"
                                  class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                  placeholder="Enter current password"
                                />
                                <input
                                  type="text"
                                  class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                  placeholder="Enter new password"
                                />
                              </div>
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-3">
                              <div class="inline-block">
                                <label
                                  for="af-account-phone"
                                  class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                                >
                                  Caretaker's Phone
                                </label>
                              </div>
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-9">
                              <div class="sm:flex">
                                <input
                                  id="af-account-phone"
                                  type="text"
                                  class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                  placeholder="+x(xxx)xxx-xx-xx"
                                />
                              </div>
                            </div>
                            <!-- End Col -->

                            <!-- End Col -->

                            <div class="sm:col-span-3">
                              <label
                                for="af-account-bio"
                                class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                              >
                                BIO
                              </label>
                            </div>
                            <!-- End Col -->

                            <div class="sm:col-span-9">
                              <textarea
                                id="af-account-bio"
                                class="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                rows="6"
                                placeholder="Type your message..."
                              ></textarea>
                            </div>
                            <!-- End Col -->
                          </div>
                          <!-- End Grid -->

                          <div class="mt-5 flex justify-end gap-x-2">
                            <button
                              type="button"
                              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                      <!-- End Card -->
                    </div>
                    <!-- End Card Section -->
                  </div>
                </div>
              </div>
              <!-- end of modal  -->
            </div>
          </div>
          <!-- End Grid -->

          <!-- SVG Element -->
          <div class="hidden md:block absolute top-0 end-0 translate-y-16 translate-x-16">
            <svg
              class="w-16 h-auto text-orange-500"
              width="121"
              height="135"
              viewBox="0 0 121 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                stroke="currentColor"
                stroke-width="10"
                stroke-linecap="round"
              />
              <path
                d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                stroke="currentColor"
                stroke-width="10"
                stroke-linecap="round"
              />
              <path
                d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                stroke="currentColor"
                stroke-width="10"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <!-- End SVG Element -->

          <!-- SVG Element -->
          <div class="hidden md:block absolute bottom-0 start-0 translate-y-16 -translate-x-16">
            <svg
              class="w-56 h-auto text-cyan-500"
              width="347"
              height="188"
              viewBox="0 0 347 188"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                stroke="currentColor"
                stroke-width="7"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <!-- End SVG Element -->
        </div>

        <div class="mt-7 text-center max-w-lg px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <!-- Card -->
          <a
            class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-notifications"
            data-hs-overlay="#hs-notifications"
          >
            <div class="p-4 md:p-5">
              <div class="flex gap-x-5">
                <div class="grow">
                  <h3
                    class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200"
                  >
                    Add a new Apartment Hostel
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">
                    you can have more than one apartment
                  </p>
                </div>
              </div>
            </div>
          </a>

          <!-- modal2   -->
          <div
            id="hs-notifications"
            class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
            role="dialog"
            tabindex="-1"
            aria-labelledby="hs-notifications-label"
          >
            <!-- Card Section -->
            <div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
              <form @submit.prevent="addHostel">
                <!-- Card -->
                <div class="bg-white rounded-xl shadow dark:bg-neutral-900">
                  <div
                    class="relative h-40 rounded-t-xl bg-[url('https://preline.co/assets/svg/examples/abstract-bg-1.svg')] bg-no-repeat bg-cover bg-center"
                  >
                    <div class="absolute top-0 end-0 p-4">
                      <button
                        type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        aria-label="Close"
                        data-hs-overlay="#hs-notifications"
                      >
                        close
                        <svg
                          class="shrink-0 size-4"
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
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="pt-0 p-4 sm:pt-0 sm:p-7">
                    <!-- Grid -->
                    <div class="space-y-4 sm:space-y-6">
                      <div>
                        <label class="sr-only"> Product photo </label>

                        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-x-5">
                          <img
                            class="-mt-8 relative z-10 inline-block size-24 mx-auto sm:mx-0 rounded-full ring-4 ring-white dark:ring-neutral-900"
                            src="https://preline.co/assets/img/160x160/img1.jpg"
                            alt="Avatar"
                          />

                          <div
                            class="mt-4 sm:mt-auto sm:mb-1.5 flex justify-center sm:justify-start gap-2"
                          >
                            <button
                              type="button"
                              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            >
                              <!-- {{ user.displayName }} -->
                            </button>
                            <button
                              type="button"
                              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="space-y-2">
                        <label
                          for="af-submit-app-project-name"
                          class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                        >
                          Choose your University
                        </label>

                        <select
                          class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          v-model="selectedUniversity"
                          @change="fetchLocations"
                          required
                        >
                          <option value="" disabled>Select University</option>
                          <option v-for="uni in universities" :key="uni.id" :value="uni.id">
                            {{ uni.name }}
                          </option>
                        </select>
                      </div>

                      <div class="space-y-2">
                        <label
                          for="af-submit-project-url"
                          class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                        >
                          Choose your Location
                        </label>

                        <!-- Dropdown to select location -->
                        <select
                          class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          v-model="selectedLocation"
                          required
                        >
                          <option value="" disabled>Select Location</option>
                          <option
                            v-for="location in locations"
                            :key="location.id"
                            :value="location.id"
                          >
                            {{ location.name }}
                          </option>
                        </select>
                      </div>

                      <div class="space-y-2">
                        <label
                          for="af-submit-project-url"
                          class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                        >
                          Hostel Name
                        </label>

                        <input
                          v-model="hostelName"
                          id="af-submit-project-url"
                          type="text"
                          class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          placeholder="Hostel Name"
                        />
                      </div>

                      <div class="space-y-2">
                        <label
                          for="af-submit-project-url"
                          class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                        >
                          Caretaker's phone number
                        </label>

                        <input
                          v-model="caretakerNumber"
                          id="af-submit-project-url"
                          type="text"
                          class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div class="space-y-2">
                        <label
                          for="af-submit-app-category"
                          class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                        >
                          Apartment/Hostel type
                        </label>

                        <select
                          v-model="hostelType"
                          id="af-submit-app-category"
                          class="py-2 px-3 pe-9 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        >
                          <option selected>Select a category</option>
                          <option>Bedsitter</option>
                          <option>One Bedroom</option>
                          <option>Two Bedroom</option>
                        </select>
                      </div>

                      <div class="space-y-2">
                        <label
                          for="af-submit-project-url"
                          class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                        >
                          Price per month
                        </label>

                        <input
                          v-model="rent"
                          id="af-submit-project-url"
                          type="text"
                          class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          placeholder="ksh"
                        />
                      </div>

                      <div class="space-y-2">
                        <label
                          for="af-submit-project-url"
                          class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                        >
                          deposit
                        </label>

                        <input
                          v-model="deposit"
                          id="af-submit-project-url"
                          type="text"
                          class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          placeholder="ksh"
                        />
                      </div>

                      <label
                        for="af-submit-app-upload-images"
                        class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                      >
                        upload at least 3 images
                      </label>
                      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        <!-- grid  -->
                        <div class="space-y-2">
                          <label
                            for="af-submit-app-upload-images"
                            class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700"
                          >
                            <input
                              id="af-submit-app-upload-images"
                              name="af-submit-app-upload-images"
                              @change="handleFiles"
                              multiple
                              accept="image/*"
                              required
                              type="file"
                              class="sr-only"
                            />
                            <svg
                              class="size-10 mx-auto text-gray-400 dark:text-neutral-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                              />
                              <path
                                d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
                              />
                            </svg>
                            <span class="mt-2 block text-sm text-gray-800 dark:text-neutral-200">
                              Browse your device or
                              <span class="group-hover:text-blue-700 text-blue-600"
                                >drag 'n drop'</span
                              >
                            </span>
                            <span class="mt-1 block text-xs text-gray-500 dark:text-neutral-500">
                              Maximum file size is 2 MB
                            </span>
                          </label>
                        </div>
                        <!-- end of grid -->
                        <!-- grid  -->
                        <div class="space-y-2">
                          <label
                            for="af-submit-app-upload-images"
                            class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700"
                          >
                            <input
                              id="af-submit-app-upload-images"
                              name="af-submit-app-upload-images"
                              type="file"
                              class="sr-only"
                            />
                            <svg
                              class="size-10 mx-auto text-gray-400 dark:text-neutral-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                              />
                              <path
                                d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
                              />
                            </svg>
                            <span class="mt-2 block text-sm text-gray-800 dark:text-neutral-200">
                              Browse your device or
                              <span class="group-hover:text-blue-700 text-blue-600"
                                >drag 'n drop'</span
                              >
                            </span>
                            <span class="mt-1 block text-xs text-gray-500 dark:text-neutral-500">
                              Maximum file size is 2 MB
                            </span>
                          </label>
                        </div>
                        <!-- end of grid -->
                        <!-- grid  -->
                        <div class="space-y-2">
                          <label
                            for="af-submit-app-upload-images"
                            class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700"
                          >
                            <input
                              id="af-submit-app-upload-images"
                              name="af-submit-app-upload-images"
                              type="file"
                              class="sr-only"
                            />
                            <svg
                              class="size-10 mx-auto text-gray-400 dark:text-neutral-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                              />
                              <path
                                d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
                              />
                            </svg>
                            <span class="mt-2 block text-sm text-gray-800 dark:text-neutral-200">
                              Browse your device or
                              <span class="group-hover:text-blue-700 text-blue-600"
                                >drag 'n drop'</span
                              >
                            </span>
                            <span class="mt-1 block text-xs text-gray-500 dark:text-neutral-500">
                              Maximum file size is 2 MB
                            </span>
                          </label>
                        </div>
                        <!-- end of grid -->
                      </div>
                    </div>
                    <!-- End Grid -->

                    <div class="mt-5 flex justify-center gap-x-2">
                      <button
                        type="submit"
                        :disabled="!canSubmit"
                        class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Finish
                      </button>
                    </div>
                  </div>
                </div>
                <!-- End Card -->
              </form>
            </div>
            <!-- End Card Section -->
          </div>
          <!-- end of modal2  -->
          <!-- End Card -->
        </div>
      </div>
    </div>
  </div>
  <!-- End Features -->

  <!-- ========== FOOTER ========== -->
  <footer class="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
    <!-- Grid -->
    <div class="text-center">
      <div>
        <a
          class="flex-none text-xl font-semibold text-black dark:text-white"
          href="#"
          aria-label="Brand"
          >Kejani</a
        >
      </div>
      <!-- End Col -->

      <div class="mt-3">
        <p class="text-gray-500 dark:text-neutral-500">
          We're part of the
          <a
            class="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
            href="#"
            >EcoSystem</a
          >
          family.
        </p>
        <p class="text-gray-500 dark:text-neutral-500">© 2024 EcoSystem Labs.</p>
      </div>

      <!-- Social Brands -->
      <div class="mt-3 space-x-2">
        <a
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          href="#"
        >
          <svg
            class="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
            />
          </svg>
        </a>
        <a
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          href="#"
        >
          <svg
            class="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
            />
          </svg>
        </a>
        <a
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          href="#"
        >
          <svg
            class="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </a>
        <a
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          href="#"
        >
          <svg
            class="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z"
            />
          </svg>
        </a>
      </div>
      <!-- End Social Brands -->
    </div>
    <!-- End Grid -->
  </footer>
  <!-- ========== END FOOTER ========== -->
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { universityStore } from '@/stores/universityStore'
import { useCaretakerStore } from '@/stores/caretakerStore'
import { useAuthStore } from '@/stores/auth'

// Store setup
const firestoreStore = universityStore()
const caretakerStore = useCaretakerStore()
const authStore = useAuthStore()

// Reactive state
const universities = ref([])
const locations = ref([])
const homes = ref([])

const selectedUniversity = ref('')
const selectedLocation = ref('')
const selectedHome = ref('')

const caretakerNumber = ref('')
const hostelType = ref('')
const rent = ref('')
const deposit = ref('')
const selectedFiles = ref([])

const user = computed(() => authStore.user)

// Fetch data
const fetchUniversities = async () => {
  universities.value = await firestoreStore.getUniversities()
}

const fetchLocations = async () => {
  locations.value = await firestoreStore.getLocations(selectedUniversity.value)
}

const fetchHomes = async () => {
  homes.value = await firestoreStore.getHomes(selectedUniversity.value, selectedLocation.value)
}

// Watchers to fetch dependent data
watch(selectedUniversity, async () => {
  selectedLocation.value = ''
  selectedHome.value = ''
  locations.value = []
  homes.value = []
  await fetchLocations()
})

watch(selectedLocation, async () => {
  selectedHome.value = ''
  homes.value = []
  await fetchHomes()
})

// File handler
const handleFiles = (e) => {
  const files = Array.from(e.target.files)
  if (files.length === 3) {
    selectedFiles.value = files
  } else {
    alert('Please select exactly 3 images.')
    selectedFiles.value = []
  }
}

// Submission eligibility
const canSubmit = computed(() => {
  return (
    selectedUniversity.value &&
    selectedLocation.value &&
    selectedHome.value &&
    caretakerNumber.value &&
    rent.value &&
    deposit.value &&
    hostelType.value &&
    selectedFiles.value.length === 3
  )
})

// Form submission
const addHostel = async () => {
  try {
    await caretakerStore.addHostel(
      selectedHome.value,
      authStore.caretakerId,
      selectedUniversity.value,
      selectedLocation.value,
      caretakerNumber.value,
      rent.value,
      deposit.value,
      hostelType.value,
      selectedFiles.value
    )
    // Reset fields
    selectedHome.value = ''
    caretakerNumber.value = ''
    rent.value = ''
    deposit.value = ''
    hostelType.value = ''
    selectedUniversity.value = ''
    selectedLocation.value = ''
    selectedFiles.value = []
  } catch (error) {
    console.error('Error submitting hostel:', error)
  }
}

// Fetch hostels on login
watch(
  () => authStore.caretakerId,
  (newCaretakerId) => {
    if (newCaretakerId) {
      caretakerStore.fetchCaretakerHostels(newCaretakerId, 'selectedUniversity', 'selectedLocation')
    }
  }
)

// Initial fetch
onMounted(() => {
  fetchUniversities()

  if (authStore.caretakerId) {
    caretakerStore.fetchCaretakerHostels(
      authStore.caretakerId,
      'selectedUniversity',
      'selectedLocation'
    )
  }

  authStore.fetchUser()
})

// Logout function
const logOut = () => {
  authStore.logOut()
}
</script>



<style></style>
