namespace :heroku do
  desc 'Run this task before assets precompile in Heroku'
  task :before_assets_precompile do
    puts '=========== Before assets precompile ==========='

    puts 'Installing Node packages...'
    system 'cd reactapp && npm install && cd ..'

    puts 'Building Node app...'
    system 'cd reactapp/ && npm run build && cd ..'

    puts 'Moving files to rails assets...'
    system 'cp reactapp/build/app.js app/assets/javascripts/app.js'
    system 'cp reactapp/build/style.css app/assets/stylesheets/style.css'
  end
end

Rake::Task['assets:precompile'].enhance ['heroku:before_assets_precompile'] if ENV['HEROKU_APP'] == 'true'
