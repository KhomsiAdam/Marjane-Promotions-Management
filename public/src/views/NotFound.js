import View from "./AbstractView.js";

export class NotFound extends View {
  constructor(params) {
    super(params);
    this.setTitle('Not Found');
  }

  async viewNotFound() {
    return `
      <main class="bg-gray-100 w-full h-screen pt-[5.5rem] overflow-y-auto">
        <div class="container px-10 mx-auto grid">
          <h2 class="my-6 text-2xl font-semibold text-gray-700">Page !found</h2>
        </div>
      </main>
    `;
  }
}