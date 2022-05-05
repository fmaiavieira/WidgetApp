import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe("Submit feddback", () => {
  let submitFeedbackUse: SubmitFeedbackUseCase;

  beforeEach(async () => {
    submitFeedbackUse = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendMail: sendMailSpy }
    );
  });

  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedbackUse.execute({
        type: "Bug",
        comment: "test comment",
        screenshot: "data:image/png:base641111111111111111111111",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedbackUse.execute({
        type: "",
        comment: "test comment",
        screenshot: "data:image/png:base641111111111111111111111",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedbackUse.execute({
        type: "type",
        comment: "",
        screenshot: "data:image/png:base641111111111111111111111",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedbackUse.execute({
        type: "type",
        comment: "test comment",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
