class Rack::Attack
  blacklist("block referer spam") do |request|
    spammers = [/floating-share-buttons/, /free-floating/,/best-seo/, /get-free/]
    spammers.find { |spammer| request.referer =~ spammer }
  end
end